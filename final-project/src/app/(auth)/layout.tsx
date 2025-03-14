import Footer from "@/components/layouts/footer/footer";
import NavBar from "@/components/layouts/nav-bar/nav-bar";
import AIChat from "@/components/ui/AI-chat/AI-chat";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <div className="relative">
          <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <main className="flex-1 flex">
              <div className="flex mt-[68px]">
                <div className="hidden md:block md:p-24">
                  <Image
                    src="/login.svg"
                    width={800}
                    height={800}
                    alt="login picture"
                  />
                </div>
                {children}
              </div>
            </main>
            <Footer></Footer>
          </div>
          <AIChat />
        </div>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AuthLayout;
