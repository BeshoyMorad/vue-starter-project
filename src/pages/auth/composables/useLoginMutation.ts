import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/vue-query";
import { authServices } from "../services";
import type { SubmissionContext } from "vee-validate";
import type { LoginForm } from "../schemas/login.schema";
import type { LoginRequest } from "../types";

export const useLoginMutation = () => {
  return useMutation<
    void,
    ApiResponse<void>,
    {
      values: LoginRequest;
      ctx: SubmissionContext<LoginForm>;
    }
  >({
    mutationFn: async ({ values }) => {
      await authServices.login(values);
    },
    onError: (error: unknown, variables) => {
      if (isAxiosError(error)) {
        variables.ctx?.setErrors(error.response?.data.errors);
      }
    },
  });
};
