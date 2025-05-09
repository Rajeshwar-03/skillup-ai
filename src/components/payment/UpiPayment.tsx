
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface UpiPaymentProps {
  onPaymentComplete: () => void;
  isLoading: boolean;
}

export const UpiPayment = ({ onPaymentComplete, isLoading }: UpiPaymentProps) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = "9618762894";

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Phone number copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-lg">
        <img 
          src="/lovable-uploads/dac0972f-1b35-4699-8a9e-10929ec08cb4.png" 
          alt="UPI QR Code" 
          className="w-48 h-48 object-contain"
        />
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">Scan using any UPI app:</p>
        <div className="flex justify-center space-x-4">
          <div className="flex flex-col items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/PhonePe_logo.png/800px-PhonePe_logo.png" 
              alt="PhonePe" 
              className="h-8 w-8 object-contain"
              title="PhonePe"
            />
            <span className="text-xs mt-1">PhonePe</span>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Pay_logo.svg/1200px-Google_Pay_logo.svg.png" 
              alt="Google Pay" 
              className="h-8 w-8 object-contain" 
              title="Google Pay"
            />
            <span className="text-xs mt-1">Google Pay</span>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" 
              alt="Paytm" 
              className="h-8 w-8 object-contain"
              title="Paytm" 
            />
            <span className="text-xs mt-1">Paytm</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <p className="mr-2">Or pay directly to: {phoneNumber}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyNumber}
          className="h-8 w-8 p-0"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      
      <Button 
        onClick={onPaymentComplete} 
        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : "I've Completed the Payment"}
      </Button>
    </div>
  );
};
