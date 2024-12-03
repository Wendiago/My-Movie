import { Mail } from "lucide-react";

const Verify = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center">
          <Mail width={100} height={100}></Mail>
        </div>
        <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">
          Check your email
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          We have sent a verification email to activate your account. Please
          check your inbox and click the verification link to complete your
          registration.
        </p>
      </div>
    </div>
  );
};

export default Verify;
