
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    
    if (!nameOnCard.trim()) {
      newErrors.nameOnCard = "Name is required";
    }
    
    if (!expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Use format MM/YY";
    }
    
    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (input: string) => {
    const numbers = input.replace(/\D/g, "");
    const groups = [];
    
    for (let i = 0; i < numbers.length && i < 16; i += 4) {
      groups.push(numbers.slice(i, i + 4));
    }
    
    return groups.join(" ");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, this would send the payment data to a payment processor
      toast.success("Processing your payment...");
      
      // Simulate payment processing
      setTimeout(() => {
        onPaymentComplete();
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{type === "credit" ? "Credit" : "Debit"} Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className={`w-full px-3 py-2 border rounded-md ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
          />
          {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Name on Card</label>
          <input
            type="text"
            placeholder="John Doe"
            className={`w-full px-3 py-2 border rounded-md ${errors.nameOnCard ? "border-red-500" : "border-gray-300"}`}
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
          />
          {errors.nameOnCard && <p className="text-xs text-red-500">{errors.nameOnCard}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className={`w-full px-3 py-2 border rounded-md ${errors.expiryDate ? "border-red-500" : "border-gray-300"}`}
            value={expiryDate}
            onChange={(e) => {
              let value = e.target.value.replace(/[^\d/]/g, "");
              if (value.length === 2 && !value.includes("/") && expiryDate.length === 1) {
                value += "/";
              }
              if (value.length <= 5) {
                setExpiryDate(value);
              }
            }}
          />
          {errors.expiryDate && <p className="text-xs text-red-500">{errors.expiryDate}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">CVV</label>
          <input
            type="text"
            placeholder="123"
            className={`w-full px-3 py-2 border rounded-md ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
            value={cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 4) {
                setCvv(value);
              }
            }}
            maxLength={4}
          />
          {errors.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : `Pay $${price}`}
      </Button>
    </div>
  );
};
