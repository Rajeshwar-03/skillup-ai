
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, BookOpen } from "lucide-react";

interface PaymentButtonProps {
  isEnrolled: boolean;
  isChecking: boolean;
  price: number;
  courseId: string;
  onAccessCourse: (courseId: string) => void;
  onClick?: () => void;
  showAccessButton?: boolean;
}

export const PaymentButton = ({
  isEnrolled,
  isChecking,
  price,
  courseId,
  onAccessCourse,
  onClick,
  showAccessButton = false
}: PaymentButtonProps) => {
  if (isEnrolled && showAccessButton) {
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

  if (price === 0) {
    return (
      <Button className="w-full" size="lg" onClick={onClick} disabled={isEnrolled}>
        <BookOpen className="mr-2 h-4 w-4" />
        {isEnrolled ? "Already Enrolled" : "Enroll Free"}
      </Button>
    );
  }

  return (
    <Button className="w-full" size="lg" onClick={onClick} disabled={isEnrolled}>
      <CreditCard className="mr-2 h-4 w-4" />
      {isEnrolled ? "Already Enrolled" : `Purchase Course ($${price})`}
    </Button>
  );
};
