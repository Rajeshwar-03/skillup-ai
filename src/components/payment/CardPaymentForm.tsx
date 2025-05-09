
import { Button } from "@/components/ui/button";

interface CardPaymentFormProps {
  type: "credit" | "debit";
  price: number;
  onPaymentComplete: () => void;
  isLoading: boolean;
}

export const CardPaymentForm = ({ 
  type, 
  price, 
  onPaymentComplete, 
  isLoading 
}: CardPaymentFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{type === "credit" ? "Credit" : "Debit"} Card Number</label>
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
      
      <Button 
        onClick={onPaymentComplete} 
        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : `Pay $${price}`}
      </Button>
    </div>
  );
};
