import * as yup from "yup";

export const schema = yup.object({
  identifier: yup
    .string()
    .required("Email is required")
    .email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters"),
  remember: yup.boolean().optional(),
});

export type LoginForm = Partial<yup.InferType<typeof schema>>;
