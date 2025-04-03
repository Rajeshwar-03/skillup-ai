
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard } from "lucide-react";

interface PaymentButtonProps {
  isEnrolled: boolean;
  isChecking: boolean;
  price: number;
  courseId: string;
  onAccessCourse: (courseId: string) => void;
  onClick?: () => void;
}

export const PaymentButton = ({
  isEnrolled,
  isChecking,
  price,
  courseId,
  onAccessCourse,
  onClick
}: PaymentButtonProps) => {
  if (isEnrolled) {
    return (
      <Button 
        className="w-full" 
        size="lg" 
        onClick={() => onAccessCourse(courseId)}
      >
        Access Course
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  if (isChecking) {
    return (
      <Button className="w-full" size="lg" disabled>
        <span className="animate-pulse">Checking access...</span>
      </Button>
    );
  }

  return (
    <Button className="w-full" size="lg" onClick={onClick}>
      <CreditCard className="mr-2" />
      Purchase Course (${price})
    </Button>
  );
};
