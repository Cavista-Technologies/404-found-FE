import { setCredentials } from "@/store/slices/auth.slice";
import type { LoginRequest } from "@/types/Authentication";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import { useToast } from "@/context/toastContext";
import type { ApiEnvelope } from "@/services/httpClient";
import { setRole } from "@/store/slices/role.slice";
import { useAppDispatch } from "./useAppDispatch";
import { resolveRedirect } from "@/lib/resolveRedirect";
import type { UserRole } from "@/config/menuConfig";

type LoginMutationData = Omit<LoginRequest, "deviceId"> & {twoFALogin?: boolean;};

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ twoFALogin, ...credentials }: LoginMutationData) =>
      authService.login({
        ...credentials,
      }),

    onSuccess: (response, variables) => {
      showToast(
        response.message ?? "Logged in successfully",
        "success",
        "Login"
      );

       if (!response.data) return;
        dispatch(
        setCredentials({ ...response.data, rememberMe: variables.rememberMe }),
      );
      dispatch(setRole(response.data.role as UserRole));
      navigate(resolveRedirect(response.data.role), { replace: true });
    },

    onError: (error: unknown) => {
      const envelope = error as ApiEnvelope<null>;
      showToast(
        envelope?.message ?? "An unexpected error occurred. Please try again.",
        "error",
        "Login Failed",
      );
    },
  });
}
