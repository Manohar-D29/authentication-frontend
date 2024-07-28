import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string().required(" Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords and Password-confirmation must match..!"
    )
    .required("Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export const resetPasswordLinkSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const resetPasswordConfirmSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords and Password-confirmation must match..!"
    )
    .required("Required"),
});

export const verifyOtpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  otp: Yup.string().required("Required"),
});
