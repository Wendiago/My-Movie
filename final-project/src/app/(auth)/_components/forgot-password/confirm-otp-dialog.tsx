import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";
import wretch from "wretch";

import React, { useState } from "react";
import { ApiResponse } from "@/types/auth";

interface ConfirmOTPProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userId: string, resetPasswordToken: string) => void;
}

const ConfirmOTPDialog: React.FC<ConfirmOTPProps> = ({
  email,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [otp, setOtp] = useState<string>("");
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const sendOtp = async () => {
    try {
      setIsResendDisabled(true);
      const response: ApiResponse<null> = await wretch(
        "/api/access/forgot-password/send-otp"
      )
        .post({ email })
        .json();

      // Enable resend button after 30 seconds
      setTimeout(() => {
        setIsResendDisabled(false);
      }, 30000); // 30 seconds

      if (response.status === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: "Resend OTP successfully - Please check your email",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Oops! Something went wrong.",
          description: response.message,
        });
      }
    } catch (error: any) {
      const errorReponse: ApiResponse<null> = error?.json || {};
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
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
      const response: ApiResponse<{
        userId: string;
        resetPasswordToken: string;
      }> = await wretch("/api/access/forgot-password/confirm-otp")
        .post({ email, otp })
        .json();

      if (response.status === 200) {
        toast({
          variant: "success",
          title: "Success!",
          description: response.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Oops! Something went wrong.",
          description: response.message,
        });
      }

      if (response.data?.userId && response.data?.resetPasswordToken) {
        onSuccess(response.data.userId, response.data.resetPasswordToken);
      }
    } catch (error: any) {
      const errorReponse: ApiResponse<null> = error?.json || {};
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
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
          <InputOTP
            maxLength={6}
            onChange={handleChange}
            value={otp}
            disabled={isLoading}
          >
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
            disabled={isResendDisabled || isLoading}
          >
            Resend OTP
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={otp.length !== 6 || isLoading}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmOTPDialog;
