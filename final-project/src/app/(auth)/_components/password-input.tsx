import { Input } from "@/components/ui/input";
import useDisclosure from "@/hooks/use-disclosure";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import { LucideEye, LucideEyeClosed } from "lucide-react";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const { isOpen, toggle } = useDisclosure(false);
  return (
    <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
      <Input
        ref={ref}
        type={isOpen ? "text" : "password"}
        className={cn(
          "focus-visible:ring-0 border-none focus-visible:ring-transparent focus-visible:ring-offset-0 ",
          className
        )}
        {...props}
      />
      <div
        className="flex justify-center items-center pr-5 cursor-pointer text-muted-foreground"
        onClick={toggle}
        aria-label={isOpen ? "Show password" : "Hide password"}
      >
        {isOpen ? <LucideEye /> : <LucideEyeClosed />}
      </div>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
