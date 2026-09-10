import { Button } from "../../../components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthImage } from "@/assets/images/images";
// import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

interface CheckEmailProps {
  email?: string;
}

export const CheckEmail = ({ email: emailProp }: CheckEmailProps) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email ?? emailProp ?? "your email";
//   const forgotPassword = useForgotPassword();

  const handleOpenEmailApp = () => {
    window.location.href = "mailto:";
  };

  const handleResend = () => {
    // forgotPassword.mutate({ email });
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-row-reverse items-stretch font-poppins overflow-hidden">
      {/* Left panel */}
      <div
        className="relative hidden lg:flex shrink-0 overflow-hidden w-[52.24%] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${AuthImage})` }}
      >
        <div className="absolute top-0 left-0 h-full w-full inset-0 bg-linear-to-b from-black/10 to-black/20 px-12.75 py-27 flex flex-col gap-2 justify-end">
          <h2 className="text-white font-medium text-4xl">
            Every Role. Every stage. Tracked.
          </h2>
          <p className="text-grey-300 text-lg leading-7">
            Structure hiring data, timestamped automatically - so your metrics
            are trustworthy and your bottlenecks are explainable, not guessed
            at.
          </p>
        </div>
      </div>

      {/* Right panel — unchanged */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12">
        <div className="w-full max-w-167.75 bg-white flex flex-col rounded-3xl border border-grey-200 px-8 py-10 gap-12">
          <div className="flex flex-col items-center gap-8">
            <div className="size-14 rounded-full bg-primary-50 flex items-center justify-center">
              <Mail className="size-6 text-primary-600" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-medium text-grey-900">
                Check your email
              </h1>
              <p className="text-sm text-grey-500">
                We've sent a reset link to{" "}
                <span className="font-medium text-grey-500">{email}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Button
              type="button"
              variant="default"
              size="lg"
              className="w-full"
              onClick={handleOpenEmailApp}
            >
              Open email app
            </Button>

            <p className="text-sm text-grey-900 text-center">
              Didn't receive the email?{" "}
              <button
                type="button"
                onClick={handleResend}
                className=" cursor-pointer text-primary-500 font-medium hover:text-primary-400 focus:text-primary-600 transition-colors focus:outline-none"
              >
                Click to resend
              </button>
            </p>

            <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full border-none hover:bg-transparent"
                onClick={() => navigate("/login")}
            >
              <ArrowLeft className="size-4" />
              Back to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
