import { useState, useEffect } from "react";
import { simulatePayment, checkCourseEnrollment } from "@/services/chatService";
import { toast } from "sonner";
import { PaymentButton } from "./payment/PaymentButton";
import { supabase } from "@/integrations/supabase/client";

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

  const handleStripeCheckout = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { amount: Math.round(price * 100), courseId, courseTitle }
      });
      if (error) throw error;
      const url = (data as any)?.url;
      if (url) {
        window.location.href = url as string;
      } else {
        toast.error("Failed to start checkout.");
      }
    } catch (err) {
      console.error("Stripe checkout error", err);
      toast.error("Unable to start payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentButton 
      isEnrolled={isEnrolled}
      isChecking={isChecking}
      price={price}
      courseId={courseId}
      onAccessCourse={onPaymentComplete}
      onClick={price === 0 ? handleFreeEnrollment : handleStripeCheckout}
      showAccessButton={showAccessButton}
    />
  );
};
