import Image from "next/image";
import { Leaf, PhoneCall } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";
import {
  FadeInFromLeft,
  FadeInView,
  ParallaxScroll,
} from "@/components/animations/animations";

// Full Page Version
export default function Login() {
  return (
    <section className="relative flex min-h-screen items-center bg-linear-to-b from-amber-50/30 to-white px-4 py-12 sm:px-6 md:px-8">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-amber-500 opacity-5" />
        <div className="absolute top-1/4 right-0 h-60 w-60 rounded-full bg-red-500 opacity-5" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-500 opacity-5" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <FadeInView>
          <h2 className="mb-6 text-center text-xl font-medium text-gray-800 sm:text-2xl">
            Please provide your phone number to continue
          </h2>
        </FadeInView>

        <ParallaxScroll>
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex flex-col sm:flex-row">
              {/* Left Side - Branding */}
              <div className="flex items-center justify-center bg-linear-to-br from-amber-700 to-red-700 p-8 sm:w-2/5">
                <FadeInFromLeft>
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative h-20 w-20">
                      <Image
                        src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                        alt="Organic Nation Logo"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white uppercase sm:text-3xl">
                        Login to
                      </h2>
                      <p className="text-2xl font-bold text-white uppercase sm:text-3xl">
                        Organic Nation
                      </p>
                    </div>

                    <div className="mt-4 hidden space-y-3 sm:block">
                      {[
                        { icon: Leaf, text: "100% Organic Products" },
                        { icon: PhoneCall, text: "Easy OTP Verification" },
                      ].map(({ icon: Icon, text }) => (
                        <div
                          key={text}
                          className="flex items-center gap-3 text-white"
                        >
                          <span className="rounded-full bg-white/10 p-2">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInFromLeft>
              </div>

              {/* Right Side - Form */}
              <AuthForm isCheckout={false} />
            </div>
          </div>
        </ParallaxScroll>
      </div>
    </section>
  );
}
