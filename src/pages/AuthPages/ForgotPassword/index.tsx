import { SquarePassword } from "../../../components/icons";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
// import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { ForgotPasswordSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthImage } from "@/assets/images/images";
import type { ForgotPasswordFormValues } from "../../../types/Authentication";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  //   const forgotPassword = useForgotPassword();

//   const onSubmit = async (data: ForgotPasswordFormValues) => {
  const onSubmit = async () => {
    // await forgotPassword.mutateAsync(
    //   { email: data.email },
    //   {
    //     onSuccess: () => {
    //       navigate("/check-email", { state: { email: data.email } });
    //     },
    //   },
    // );
  };

  //   const isPending = isSubmitting || forgotPassword.isPending;
  const isPending = isSubmitting;

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
          <p className="text-grey-50 text-lg leading-7">
            Structure hiring data, timestamped automatically - so your metrics
            are trustworthy and your bottlenecks are explainable, not guessed
            at.
          </p>
        </div>
      </div>

      {/* Right panel — unchanged */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="bg-white flex flex-col w-full lg:w-167.75 rounded-3xl border border-grey-200 py-10 px-8 gap-12">
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="size-14 rounded-full bg-primary-50 flex items-center justify-center">
              <SquarePassword className="size-6 text-primary-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-medium text-grey-900">
                Forgot Password?
              </h1>
              <p className="text-sm text-grey-500">
                No worries, we will send your reset instructions.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-grey-900">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-error-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Reset Link"}
              </Button>
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
          </form>
        </div>
      </div>
    </div>
  );
};
