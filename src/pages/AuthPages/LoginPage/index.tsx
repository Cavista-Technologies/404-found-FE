import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import type { LoginFormValues } from "../../../types/Authentication";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../schemas";
import { cn } from "../../../lib/utils";
import LoginImage from "../../../assets/images/ct-recruita.png"
import Logo from "../../../assets/images/CavistaLogoWithText.png"

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  //   const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  //  const onSubmit = async ({ email, password, rememberMe }: LoginFormValues) => {
  const onSubmit = async ({}: LoginFormValues) => {
    // await login.mutateAsync({
    //   emailAddress: email,
    //   password,
    //   rememberMe: rememberMe ?? true,
    // });
  };

  //   const isPending = isSubmitting || login.isPending;
  const isPending = isSubmitting;

  return (
    <div className="min-h-screen w-full bg-white px-8.5 flex flex-row-reverse items-stretch font-poppins overflow-hidden">
      {/* Left panel */}
      <div className="hidden lg:flex shrink-0 h-screen overflow-hidden w-[52.24%] py-6">
        {!imageLoaded && <Skeleton className="w-full h-full rounded-[30px]" />}

        <img
          src={LoginImage}
          alt="CT-Care lifestyle"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover rounded-[30px]",
            imageLoaded ? "block" : "hidden",
          )}
        />
      </div>

      {/* Right panel — unchanged */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white w-full flex flex-col gap-8 px-4 py-8 border border-grey-200 rounded-3xl max-h-151.75 max-w-167.75">
          <div className="flex flex-col items-center gap-12 text-center">
            <img
              src={Logo}
              alt="Cavista"
              className="lg:h-10 h-7.5 w-auto object-contain"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium leading-8 tracking-[-0.02em] text-grey-900">
                Welcome!
              </h1>
              <p className="text-sm leading-5 font-normal tracking-normal text-grey-500">
                Kindly enter your email and password to log in.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium leading-5 tracking-normal text-grey-900">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="joefinde@cavista.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-error-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium leading-5 tracking-normal text-grey-900">
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password")}
                icon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4 text-grey-500 hover:text-grey-600" />
                    ) : (
                      <Eye className="size-4 text-grey-500 hover:text-grey-600" />
                    )}
                  </button>
                }
                iconPosition="right"
              />
              {errors.password && (
                <p className="text-xs text-error-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="size-4 rounded border-grey-300 accent-primary cursor-pointer"
                  {...register("rememberMe")}
                />
                <span className="text-sm text-grey-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-normal text-primary-500 hover:text-primary-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
