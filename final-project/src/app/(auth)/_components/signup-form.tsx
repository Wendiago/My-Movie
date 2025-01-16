"use-client";
import React, { useState } from "react";
import { TRegisterSchema, registerSchema } from "../_data/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInput } from "./password-input";
import { paths } from "@/lib/routes";
import LoginGoogleButton from "./google-login-button";
import { toast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/auth";
import { Spinner } from "@/components/ui/spinner";
import OtpDialog from "./otp-dialog";
import httpMethods from "@/lib/https";

const SignupForm = () => {
  const [verificationEmail, setVerificationEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: TRegisterSchema) => {
    const { email } = data;
    setIsLoading(true);
    setVerificationEmail(email);
    try {
      await httpMethods.post<ApiResponse<null>>("/api/v1/auth/signup", {
        email: data.email,
        password: data.password,
      });
      setIsOtpDialogOpen(true);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-card p-10 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Account Sign up
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
          <div className="flex flex-col gap-1 mb-4">
            <label
              htmlFor="confirmPassword"
              className="text-card-foreground mb-2"
            >
              Confirm Password:{" "}
            </label>
            <PasswordInput
              placeholder="Enter your password again"
              {...register("confirmPassword")}
            ></PasswordInput>
            {errors.confirmPassword && (
              <p className="text-destructive my-1">{`${errors.confirmPassword.message}`}</p>
            )}
          </div>
          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Spinner variant="light" />}
            Sign up
          </Button>
          <div className="flex justify-center mt-4 space-x-6">
            <LoginGoogleButton />
          </div>
          <div className="text-center mt-4">
            <p className="text-card-foreground">
              Already have an account?{" "}
              <Link
                href={paths.auth.login.getHref()}
                className="text-primary font-semibold"
              >
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <OtpDialog
        isOpen={isOtpDialogOpen}
        email={verificationEmail}
        onClose={() => setIsOtpDialogOpen(false)}
      />
    </div>
  );
};

export default SignupForm;
