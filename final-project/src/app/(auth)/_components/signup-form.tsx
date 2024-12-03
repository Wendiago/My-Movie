"use-client";
import { TRegisterSchema, registerSchema } from "../_data/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInput } from "./password-input";
import { paths } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useRegister } from "@/api/auth/auth";
import LoginGoogleButton from "./google-login-button";
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });

  const router = useRouter();
  const registerMutation = useRegister({
    onSuccess: () => {
      // Navigate to verify page
      router.push(paths.auth.verify.getHref());
    },
    onError: () => {
      console.log("Error register");
    },
  });

  const onSubmit = (data: TRegisterSchema) => {
    const { email, password } = data;
    registerMutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-card p-10 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
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
          <div className="inline-flex items-center mb-6">
            <Input
              type="checkbox"
              name="remember-me"
              className="mr-2 h-3 w-3"
            ></Input>
            <label htmlFor="remember-me" className="text-card-foreground">
              Remember me?
            </label>
          </div>
          <Button className="w-full" size="lg" type="submit">
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
    </div>
  );
};

export default SignupForm;
