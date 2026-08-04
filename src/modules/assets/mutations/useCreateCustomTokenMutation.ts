import type { SubmissionContext } from 'vee-validate';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { assetsServices } from '@/modules/assets/services';
import type { CreateCustomTokenPayload } from '@/modules/assets/types';
import type { CustomTokenFormValues } from '@/modules/assets/schemas/custom-token.schema';
import { success as successToast, error as errorToast } from '@/utils/toast';
import { applyApiErrorToForm, getApiErrorMessage } from '@/utils/apiError';
import { QUERY_KEYS } from '@/lib/query-keys';

export const useCreateCustomTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<unknown>,
    unknown,
    {
      values: CreateCustomTokenPayload;
      ctx: SubmissionContext<CustomTokenFormValues>;
    }
  >({
    mutationFn: async ({ values }) => {
      return await assetsServices.createCustomToken(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assets.list() });
      successToast(data.message || 'Custom token added successfully');
    },
    onError: (error: unknown, variables) => {
      applyApiErrorToForm(error, variables.ctx.setErrors);
      const message = getApiErrorMessage(error, 'Failed to add custom token');
      errorToast(message);
    },
  });
};
