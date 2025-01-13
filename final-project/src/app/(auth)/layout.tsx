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
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <div className="relative">
          <div className="flex flex-col min-h-screen">
            <NavBar></NavBar>
            <main className="flex-1 flex">
              <div className="md:grid md:grid-cols-2 mt-12">
                <div className="md:col-span-1 p-16 md:p-24 xl:p-40 2xl:p-80">
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
