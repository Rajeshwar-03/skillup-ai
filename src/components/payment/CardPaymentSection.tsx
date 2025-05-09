
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";
import { CardPaymentForm } from "./CardPaymentForm";

interface CardPaymentSectionProps {
  price: number;
  onPaymentComplete: (method: string) => void;
  isLoading: boolean;
}

export const CardPaymentSection = ({ 
  price, 
  onPaymentComplete, 
  isLoading 
}: CardPaymentSectionProps) => {
  const [activeCardTab, setActiveCardTab] = useState("credit");

  return (
    <div className="space-y-4">
      <Tabs value={activeCardTab} onValueChange={setActiveCardTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="credit">
            <CreditCard className="mr-2 h-4 w-4" />
            Credit Card
          </TabsTrigger>
          <TabsTrigger value="debit">
            <CreditCard className="mr-2 h-4 w-4" />
            Debit Card
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="credit" className="space-y-4">
          <CardPaymentForm 
            type="credit" 
            price={price}
            onPaymentComplete={() => onPaymentComplete('credit-card')}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="debit" className="space-y-4">
          <CardPaymentForm 
            type="debit" 
            price={price}
            onPaymentComplete={() => onPaymentComplete('debit-card')}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
      
      <div className="text-center text-xs text-muted-foreground mt-2">
        <p>We accept Visa, Mastercard, RuPay, and American Express</p>
        <div className="flex justify-center space-x-2 mt-1 bg-gradient-to-r from-orange-50 to-amber-50 p-2 rounded">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 w-8 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 w-8 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/RuPay-Logo.png/1200px-RuPay-Logo.png" alt="RuPay" className="h-6 w-8 object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="h-6 w-8 object-contain" />
        </div>
      </div>
    </div>
  );
};
