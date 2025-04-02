
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, CreditCard, QrCode } from "lucide-react";
import { toast } from "sonner";

interface PaymentOptionsProps {
  courseTitle: string;
  price: number;
  onPaymentComplete: () => void;
}

export const PaymentOptions = ({ courseTitle, price, onPaymentComplete }: PaymentOptionsProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = "9618762894";

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Phone number copied to clipboard");
  };

  const handlePaymentSimulation = () => {
    toast.success("Processing payment...");
    setTimeout(() => {
      setOpen(false);
      onPaymentComplete();
      toast.success("Payment successful!");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <CreditCard className="mr-2" />
          Purchase Course (${price})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Purchase {courseTitle}</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to complete the purchase
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upi" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="upi">UPI Options</TabsTrigger>
            <TabsTrigger value="card">Card Payment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upi" className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <img 
                  src="/lovable-uploads/dac0972f-1b35-4699-8a9e-10929ec08cb4.png" 
                  alt="UPI QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Scan using any UPI app:</p>
                <div className="flex justify-center space-x-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/PhonePe_logo.png/800px-PhonePe_logo.png" alt="PhonePe" className="h-8 w-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Pay_logo.svg/1200px-Google_Pay_logo.svg.png" alt="Google Pay" className="h-8 w-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm" className="h-8 w-8 object-contain" />
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
              
              <Button onClick={handlePaymentSimulation} className="w-full">
                I've Completed the Payment
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="card" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name on Card</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <Button onClick={handlePaymentSimulation} className="w-full">
                Pay ${price}
              </Button>
              
              <div className="text-center text-xs text-muted-foreground mt-2">
                <p>We accept Visa, Mastercard, RuPay, and American Express</p>
                <div className="flex justify-center space-x-2 mt-1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 w-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 w-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/RuPay-Logo.png/1200px-RuPay-Logo.png" alt="RuPay" className="h-6 w-8 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="h-6 w-8 object-contain" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
