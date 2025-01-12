import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import wretch from "wretch";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { ApiResponse } from "@/types/auth";

interface OtpDialogProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

const OtpDialog: React.FC<OtpDialogProps> = ({ email, isOpen, onClose }) => {
  const [otp, setOtp] = useState<string>("");
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      sendOtp();
    }
  }, [isOpen]);

  const sendOtp = async () => {
    try {
      setIsResendDisabled(true);
      await wretch("/api/access/verify/send-otp").post({ email }).json();

      // Enable resend button after 30 seconds
      setTimeout(() => {
        setIsResendDisabled(false);
      }, 30000); // 30 seconds
    } catch (error: any) {
      const errorReponse: ApiResponse<null> = error?.json || {};
      toast({
        variant: "destructive",
        title: "Resend OTP failed",
        description: errorReponse.message,
      });
    }
  };

  const handleChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setOtp(value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse<null> = await wretch(
        "/api/access/verify/confirm-otp"
      )
        .post({ email, otp })
        .json();

      onClose();
      toast({
        title: "Success!",
        description: response.message || "OTP verified successfully.",
      });

      router.push("/login");
    } catch (error: any) {
      const errorReponse: ApiResponse<null> = error?.json || {};
      toast({
        variant: "destructive",
        title: "Verify failed",
        description: errorReponse.message,
      });
    } finally {
      setIsLoading(false);
      setOtp("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[300px] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            Please enter the 6-digit OTP sent to your email.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <InputOTP maxLength={6} onChange={handleChange} value={otp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            onClick={sendOtp}
            disabled={isResendDisabled}
          >
            Resend OTP
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={otp.length !== 6 || isLoading}
          >
            {isLoading && <Spinner variant="light" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
