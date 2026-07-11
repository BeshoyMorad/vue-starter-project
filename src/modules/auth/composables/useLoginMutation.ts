import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/vue-query';
import { authServices } from '@/modules/auth/services';
import type { SubmissionContext } from 'vee-validate';
import type { LoginForm } from '@/modules/auth/schemas/login.schema';
import type { LoginRequest, LoginResponse } from '@/modules/auth/types';
import { useAuthStore } from '@/stores/auth';
import { useAuthRedirect } from '@/composables/useAuthRedirect';

export const useLoginMutation = () => {
  const authStore = useAuthStore();
  const { handleRedirect } = useAuthRedirect();

  return useMutation<
    ApiResponse<LoginResponse>,
    ApiResponse<void>,
    {
      values: LoginRequest;
      ctx: SubmissionContext<LoginForm>;
    }
  >({
    mutationFn: async ({ values }) => {
      return await authServices.login(values);
    },
    onSuccess: (response) => {
      authStore.login({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        user: response.data.user,
      });
      handleRedirect();
    },
    onError: (error: unknown, variables) => {
      if (isAxiosError(error)) {
        variables.ctx?.setErrors(error.response?.data.errors);
      }
    },
  });
};
