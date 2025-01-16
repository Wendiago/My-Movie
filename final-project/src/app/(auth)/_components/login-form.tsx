"use client";
import React, { useState } from "react";
import { TLoginSchema, loginSchema } from "../_data/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./password-input";
import { paths } from "@/lib/routes";
import { useRouter } from "next/navigation";
import LoginGoogleButton from "./google-login-button";
import { toast } from "@/hooks/use-toast";
import {
  ACCOUNT_NOT_VERIFIED_ERROR_MESSAGE,
  INVALID_LOGIN_ERROR_MESSAGE,
  Providers,
} from "@/constants/data";
import OtpDialog from "./otp-dialog";
import SendOTPDialog from "./forgot-password/send-otp-dialog";
import ConfirmOTPDialog from "./forgot-password/confirm-otp-dialog";
import ResetPasswordDialog from "./forgot-password/reset-password-dialog";
import { signIn } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import LoadingOverlay from "@/components/ui/loading/loading-overlay";
import { SolarSystem } from "@/components/ui/loading/solar-system";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowOtpDialog, setIsShowOtpDialog] = useState(false);
  const [isShowForgotPasswordDialog, setIsShowForgotPasswordDialog] =
    useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string>("");

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
  const [isOtpDialogOpen, setIsOtpDiaLogOpen] = useState(false);
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [infoForgotPassword, setInfoForgotPassword] = useState<{
    userId: string;
    resetPasswordToken: string;
  }>({
    userId: "",
    resetPasswordToken: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();

  const onSubmit = async (data: TLoginSchema) => {
    setIsLoading(true);
    setVerificationEmail(data.email);

    console.log("Login data: ", data);
    // Sign in with credentials using NextAuth
    const result = await signIn(Providers.Credentials, {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    //console.log(result);

    if (result?.code === INVALID_LOGIN_ERROR_MESSAGE) {
      // Email or password is invalid
      toast({
        variant: "destructive",
        title: "Login failed",
        description: result.code,
      });
    } else if (result?.code === ACCOUNT_NOT_VERIFIED_ERROR_MESSAGE) {
      // Account not verified
      toast({
        variant: "destructive",
        title: "Login failed",
        description: result.code,
      });

      // Display OTP dialog
      setIsShowOtpDialog(true);

      // Reset the form
      reset();
    } else if (!result?.error) {
      // Login successful
      toast({
        variant: "success",
        title: "Success!",
        description: "You have successfully logged in.",
      });

      // Redirect to the home pages
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Something is wrong!",
      });
    }

    setIsLoading(false);
  };

  const handleOpenForgetPasswordDialog = () => {
    // Open the OTP dialog
    setIsShowForgotPasswordDialog(true);
  };

  const handleEmailSubmit = (email: string) => {
    setForgotPasswordEmail(email);
    setIsShowForgotPasswordDialog(false);
    setIsOtpDiaLogOpen(true);
  };

  const handleOTPSubmit = (userId: string, resetPasswordToken: string) => {
    setInfoForgotPassword({
      userId,
      resetPasswordToken,
    });
    setIsOtpDiaLogOpen(false);
    setIsOpenForgotPassword(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-card p-10 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Account Login
        </h2>
        <p className="text-gray-500 text-center mb-8">
          If you are already a member you can login with your email address and
          password.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="email" className="text-card-foreground mb-2">
              Email address:{" "}
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            ></Input>
            {errors.email && (
              <p className="text-destructive my-1">{`${errors.email.message}`}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="password" className="text-card-foreground mb-2">
              Password:{" "}
            </label>
            <PasswordInput
              placeholder="Enter your password"
              {...register("password")}
            ></PasswordInput>
            {errors.password && (
              <p className="text-destructive my-1">{`${errors.password.message}`}</p>
            )}
          </div>
          <div
            className="mt-4 cursor-pointer text-end"
            onClick={handleOpenForgetPasswordDialog}
          >
            Forgot password?
          </div>
          <Button
            className="w-full mt-4"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Spinner variant="light" />}
            Login
          </Button>
          <div className="flex justify-center mt-4 space-x-6">
            <LoginGoogleButton />
          </div>
          <div className="text-center mt-4">
            <p className="text-card-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href={paths.auth.register.getHref()}
                className="text-primary font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
      {/* OTP Dialog */}
      <OtpDialog
        isOpen={isShowOtpDialog}
        onClose={() => setIsShowOtpDialog(false)}
        email={verificationEmail}
      />

      <SendOTPDialog
        isOpen={isShowForgotPasswordDialog}
        onClose={() => setIsShowForgotPasswordDialog(false)}
        onSuccess={handleEmailSubmit}
      />

      <ConfirmOTPDialog
        email={forgotPasswordEmail}
        isOpen={isOtpDialogOpen}
        onClose={() => setIsOtpDiaLogOpen(false)}
        onSuccess={handleOTPSubmit}
      />

      <ResetPasswordDialog
        infoForgotPassword={infoForgotPassword}
        isOpen={isOpenForgotPassword}
        onClose={() => setIsOpenForgotPassword(false)}
      />
      {isLoading && <LoadingOverlay spinner={<SolarSystem />} />}
    </div>
  );
};

export default LoginForm;
