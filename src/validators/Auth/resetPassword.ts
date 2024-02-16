import * as Yup from "yup";

export const resetPasswordValidation = Yup.object().shape({
  user: Yup.string().required("Email is required"),
});
