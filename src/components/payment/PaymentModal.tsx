
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UpiPayment } from "./UpiPayment";
import { CardPaymentSection } from "./CardPaymentSection";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
  price: number;
  courseId?: string; // Added courseId as optional prop
  onPaymentComplete: (method: string) => void;
  isLoading: boolean;
}

export const PaymentModal = ({ 
  open, 
  onOpenChange, 
  courseTitle, 
  price,
  courseId,
  onPaymentComplete,
  isLoading
}: PaymentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <UpiPayment 
              onPaymentComplete={() => onPaymentComplete('upi')} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="card" className="space-y-4">
            <CardPaymentSection 
              price={price} 
              onPaymentComplete={onPaymentComplete} 
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
