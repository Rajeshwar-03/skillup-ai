
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Video } from "lucide-react";
import { toast } from "sonner";

interface MaterialType {
  name: string;
  url: string;
  type: string;
}

interface CourseMaterialsProps {
  materials: MaterialType[];
  demoVideo: string;
}

export const CourseMaterials = ({ materials, demoVideo }: CourseMaterialsProps) => {
  const handleDownload = (material: MaterialType) => {
    try {
      // Create an anchor element and set the href to the resource URL
      const link = document.createElement('a');
      link.href = material.url;
      link.download = material.name;
      link.target = "_blank";
      
      // Append to the document body and click
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      
      toast.success(`Downloading ${material.name}`);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Course Demo Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-md overflow-hidden bg-muted">
            <iframe
              src={demoVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              title="Course Demo Video"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Course Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <p className="text-muted-foreground">No materials available for this course yet.</p>
          ) : (
            <ul className="space-y-3">
              {materials.map((material, index) => (
                <li key={index} className="flex items-center justify-between py-2 px-3 rounded-md border">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>{material.name}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {material.type}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleDownload(material)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
