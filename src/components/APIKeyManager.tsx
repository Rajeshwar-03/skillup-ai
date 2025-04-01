
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const APIKeyManager = ({ onSave }: { onSave: (apiKey: string) => void }) => {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  // Load API key from localStorage if it exists
  useEffect(() => {
    const savedKey = localStorage.getItem("user_openai_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    // Save to localStorage
    localStorage.setItem("user_openai_api_key", apiKey);
    
    // Notify parent component
    onSave(apiKey);
    
    toast.success("API key saved successfully");
  };

  const handleClear = () => {
    localStorage.removeItem("user_openai_api_key");
    setApiKey("");
    onSave("");
    toast.success("API key removed");
  };

  return (
    <div className="mb-4 p-4 bg-background/50 backdrop-blur-sm border border-border rounded-lg">
      <h3 className="text-base font-medium mb-2">OpenAI API Key</h3>
      <p className="text-sm text-muted-foreground mb-3">
        For faster responses, provide your own OpenAI API key.
      </p>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={isVisible ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {isVisible ? "Hide" : "Show"}
          </button>
        </div>
        
        <button
          onClick={handleSave}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm"
        >
          Save
        </button>
        
        {apiKey && (
          <button
            onClick={handleClear}
            className="px-3 py-2 bg-destructive text-destructive-foreground rounded-md text-sm"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
