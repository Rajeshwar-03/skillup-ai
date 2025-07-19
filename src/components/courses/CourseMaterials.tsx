import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Upload, FileText, Video, Link as LinkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

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
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "1",
      name: "Course Introduction Video",
      type: "video",
      url: "https://example.com/intro.mp4",
      uploadedBy: "Instructor",
      uploadedAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Getting Started Guide",
      type: "pdf",
      url: "https://example.com/guide.pdf",
      uploadedBy: "Instructor",
      uploadedAt: "2024-01-15"
    },
    {
      id: "3",
      name: "Additional Resources",
      type: "link",
      url: "https://example.com/resources",
      uploadedBy: "Instructor",
      uploadedAt: "2024-01-16"
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "pdf" as Material["type"],
    file: null as File | null,
    url: ""
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, file, name: file.name });
    }
  };

  const handleUpload = () => {
    if (!uploadForm.name) {
      toast.error("Please provide a material name");
      return;
    }

    const newMaterial: Material = {
      id: Date.now().toString(),
      name: uploadForm.name,
      type: uploadForm.type,
      url: uploadForm.type === "link" ? uploadForm.url : URL.createObjectURL(uploadForm.file!),
      uploadedBy: isInstructor ? "Instructor" : "Student",
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    setMaterials([...materials, newMaterial]);
    setUploadForm({ name: "", type: "pdf", file: null, url: "" });
    toast.success("Material uploaded successfully!");
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
    toast.success(`Downloading ${material.name}`);
  };

  if (!isEnrolled) {
    return (
      <Card>
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
    <Card>
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
            <DialogContent>
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
            <div key={material.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getIcon(material.type)}
                <div>
                  <p className="font-medium">{material.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded by {material.uploadedBy} on {material.uploadedAt}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleDownload(material)}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};