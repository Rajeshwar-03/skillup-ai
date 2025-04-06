
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
  showAccessButton?: boolean;
}

export const PaymentOptions = ({ 
  courseTitle, 
  price, 
  courseId, 
  onPaymentComplete,
  showAccessButton = false
}: PaymentOptionsProps) => {
  const [open, setOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [accessComplete, setAccessComplete] = useState(false);

  useEffect(() => {
    // Check if user is already enrolled
    const checkEnrollment = async () => {
      setIsChecking(true);
      try {
        const { enrolled } = await checkCourseEnrollment(courseId);
        setIsEnrolled(enrolled);
        
        // If already enrolled and showAccessButton is true, redirect to course access only once
        if (enrolled && showAccessButton && !accessComplete) {
          setAccessComplete(true);
          onPaymentComplete(courseId);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
        toast.error("Failed to check enrollment status");
      } finally {
        setIsChecking(false);
      }
    };
    
    checkEnrollment();
  }, [courseId, onPaymentComplete, showAccessButton, accessComplete]);

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
          setAccessComplete(true);
          onPaymentComplete(courseId);
        } else {
          setTimeout(() => {
            setOpen(false);
            toast.success("Payment successful! You now have access to the course.");
            setIsEnrolled(true);
            setAccessComplete(true);
            onPaymentComplete(courseId);
          }, 1500);
        }
      } else {
        toast.error(result.message || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreeEnrollment = () => {
    if (isEnrolled) return;
    
    setIsLoading(true);
    toast.success("Enrolling you in this free course...");
    
    setTimeout(() => {
      setIsEnrolled(true);
      setAccessComplete(true);
      setIsLoading(false);
      onPaymentComplete(courseId);
    }, 1000);
  };

  // For free courses, directly show the Enroll button without dialog
  if (price === 0) {
    return (
      <PaymentButton 
        isEnrolled={isEnrolled}
        isChecking={isChecking}
        price={price}
        courseId={courseId}
        onAccessCourse={onPaymentComplete}
        onClick={handleFreeEnrollment}
        showAccessButton={showAccessButton}
      />
    );
  }

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
              showAccessButton={showAccessButton}
            />
          </div>
        </DialogTrigger>
        
        <PaymentModal 
          open={open}
          onOpenChange={setOpen}
          courseTitle={courseTitle}
          price={price}
          courseId={courseId}
          onPaymentComplete={handlePaymentSimulation}
          isLoading={isLoading}
        />
      </Dialog>
    </>
  );
};
