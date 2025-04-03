
import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { simulatePayment, checkCourseEnrollment } from "@/services/chatService";
import { toast } from "sonner";
import { PaymentButton } from "./payment/PaymentButton";
import { PaymentModal } from "./payment/PaymentModal";

export interface PaymentOptionsProps {
  courseTitle: string;
  price: number;
  courseId: string;
  onPaymentComplete: (courseId: string) => void;
}

export const PaymentOptions = ({ courseTitle, price, courseId, onPaymentComplete }: PaymentOptionsProps) => {
  const [open, setOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is already enrolled
    const checkEnrollment = async () => {
      setIsChecking(true);
      const { enrolled } = await checkCourseEnrollment(courseId);
      setIsEnrolled(enrolled);
      setIsChecking(false);
      
      // If already enrolled, redirect to course access
      if (enrolled) {
        onPaymentComplete(courseId);
      }
    };
    
    checkEnrollment();
  }, [courseId, onPaymentComplete]);

  const handlePaymentSimulation = async (paymentMethod: string) => {
    setIsLoading(true);
    toast.success("Processing payment...");
    
    try {
      const result = await simulatePayment(courseId, paymentMethod);
      
      if (result.success) {
        if (result.alreadyEnrolled) {
          toast.info("You are already enrolled in this course");
          setOpen(false);
          setIsEnrolled(true);
          onPaymentComplete(courseId);
        } else {
          setTimeout(() => {
            setOpen(false);
            toast.success("Payment successful! You now have access to the course.");
            setIsEnrolled(true);
            onPaymentComplete(courseId);
          }, 1500);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <PaymentButton 
              isEnrolled={isEnrolled}
              isChecking={isChecking}
              price={price}
              courseId={courseId}
              onAccessCourse={onPaymentComplete}
              onClick={() => setOpen(true)}
            />
          </div>
        </DialogTrigger>
        
        <PaymentModal 
          open={open}
          onOpenChange={setOpen}
          courseTitle={courseTitle}
          price={price}
          onPaymentComplete={handlePaymentSimulation}
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};
