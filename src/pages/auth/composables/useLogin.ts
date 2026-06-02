import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { schema, type LoginForm } from "../schemas/login.schema";
import { useLoginMutation } from "./useLoginMutation";

export default function useLogin() {
  const validationSchema = toTypedSchema(schema);

  const { handleSubmit } = useForm<LoginForm>({
    validationSchema,
    initialValues: {
      identifier: "",
      password: "",
      remember: false,
    },
  });

  const { mutateAsync, isPending, isSuccess } = useLoginMutation();

  const onSubmit = handleSubmit((values, ctx) => {
    mutateAsync({ values, ctx });
  });

  return {
    onSubmit,
    isPending,
    isSuccess,
  };
}
