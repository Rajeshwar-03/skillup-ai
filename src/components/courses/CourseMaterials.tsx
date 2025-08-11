import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload, FileText, Video, Link as LinkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Material {
  id: string;
  name: string;
  type: "video" | "pdf" | "link" | "document";
  url: string;
  uploadedBy?: string;
  uploadedAt?: string;
}

interface CourseMaterialsProps {
  courseId: string;
  isEnrolled: boolean;
  isInstructor?: boolean;
}

export const CourseMaterials = ({ courseId, isEnrolled, isInstructor = false }: CourseMaterialsProps) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "pdf" as Material["type"],
    file: null as File | null,
    url: ""
  });

  const detectType = (fileName: string): Material["type"] => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["mp4", "mov", "webm", "avi", "mkv"].includes(ext || "")) return "video";
    return "document";
  };

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return; // Only list current user's uploads for now
        const basePath = `${user.id}/${courseId}`;
        const { data, error } = await supabase.storage.from("course-materials").list(basePath, { limit: 100, sortBy: { column: "name", order: "asc" } });
        if (error) throw error;
        const mapped: Material[] = (data || [])
          .filter((f) => f.name)
          .map((f) => {
            const path = `${basePath}/${f.name}`;
            const { data: pub } = supabase.storage.from("course-materials").getPublicUrl(path);
            return {
              id: path,
              name: f.name,
              type: detectType(f.name),
              url: pub.publicUrl,
              uploadedBy: isInstructor ? "Instructor" : "You",
              uploadedAt: new Date(f.created_at || Date.now()).toISOString().split("T")[0]
            } as Material;
          });
        setMaterials(mapped);
      } catch (e) {
        console.error("Failed to load materials", e);
      }
    };
    loadMaterials();
  }, [courseId, isInstructor]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, file, name: file.name, type: detectType(file.name) });
    }
  };

  const handleUpload = async () => {
    try {
      if (uploadForm.type === "link") {
        if (!uploadForm.name || !uploadForm.url) {
          toast.error("Please provide a name and URL");
          return;
        }
        const newMaterial: Material = {
          id: Date.now().toString(),
          name: uploadForm.name,
          type: "link",
          url: uploadForm.url,
          uploadedBy: isInstructor ? "Instructor" : "You",
          uploadedAt: new Date().toISOString().split("T")[0]
        };
        setMaterials((prev) => [...prev, newMaterial]);
        setUploadForm({ name: "", type: "pdf", file: null, url: "" });
        toast.success("Link added.");
        return;
      }

      if (!uploadForm.file) {
        toast.error("Please choose a file");
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to upload");
        return;
      }

      const file = uploadForm.file;
      const basePath = `${user.id}/${courseId}`;
      const path = `${basePath}/${file.name}`;
      const { error: uploadError } = await supabase.storage.from("course-materials").upload(path, file, { upsert: false, contentType: file.type || undefined });
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from("course-materials").getPublicUrl(path);
      const newMaterial: Material = {
        id: path,
        name: file.name,
        type: detectType(file.name),
        url: pub.publicUrl,
        uploadedBy: isInstructor ? "Instructor" : "You",
        uploadedAt: new Date().toISOString().split("T")[0]
      };
      setMaterials((prev) => [newMaterial, ...prev]);
      setUploadForm({ name: "", type: "pdf", file: null, url: "" });
      toast.success("Material uploaded successfully!");
    } catch (e: any) {
      console.error("Upload failed", e);
      toast.error(e?.message || "Upload failed");
    }
  };

  const getIcon = (type: Material["type"]) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "pdf": return <FileText className="w-4 h-4" />;
      case "link": return <LinkIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleDownload = (material: Material) => {
    window.open(material.url, '_blank');
    toast.success(`Opening ${material.name}`);
  };

  if (!isEnrolled) {
    return (
      <Card className="border border-strong">
        <CardHeader>
          <CardTitle>Course Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enroll in this course to access materials and resources.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-strong">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Course Materials</CardTitle>
        {(isInstructor || isEnrolled) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-strong">
              <DialogHeader>
                <DialogTitle>Upload Course Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="material-name">Material Name</Label>
                  <Input
                    id="material-name"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    placeholder="Enter material name"
                  />
                </div>
                <div>
                  <Label htmlFor="material-type">Type</Label>
                  <select
                    id="material-type"
                    className="w-full p-2 border rounded-md"
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value as Material["type"] })}
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="video">Video</option>
                    <option value="link">External Link</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                {uploadForm.type === "link" ? (
                  <div>
                    <Label htmlFor="material-url">URL</Label>
                    <Input
                      id="material-url"
                      value={uploadForm.url}
                      onChange={(e) => setUploadForm({ ...uploadForm, url: e.target.value })}
                      placeholder="Enter URL"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="material-file">File</Label>
                    <Input
                      id="material-file"
                      type="file"
                      onChange={handleFileUpload}
                      accept={uploadForm.type === "video" ? "video/*" : uploadForm.type === "pdf" ? ".pdf" : "*"}
                    />
                  </div>
                )}
                <Button onClick={handleUpload} className="w-full">
                  Upload Material
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-strong">
              <div className="flex items-center gap-3">
                {getIcon(material.type)}
                <div>
                  <p className="font-medium">{material.name}</p>
                  {material.uploadedBy && (
                    <p className="text-sm text-muted-foreground">
                      Uploaded by {material.uploadedBy} {material.uploadedAt ? `on ${material.uploadedAt}` : ""}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleDownload(material)}>
                <Download className="w-4 h-4 mr-2" />
                Open
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
