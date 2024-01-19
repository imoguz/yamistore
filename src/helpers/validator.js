import { object, string, ref } from "yup";

const passwordValidation = string()
  .required()
  .matches(/\d+/, "Password must contain at least one digit")
  .matches(/[a-z]/, "Password must contain at least one lowercase")
  .matches(/[A-Z]/, "Password must contain at least one uppercase")
  .matches(
    /[!,?{}><%&$#£+-.@]+/,
    "Password must contain at least one special character"
  )
  .min(8, "Password must be min 8 characters")
  .max(32, "Password must be max 32 characters");

export const signinSchema = object({
  email: string().email().required(),
  password: passwordValidation,
});

export const signupSchema = object({
  firstname: string().required(),
  lastname: string().required(),
  username: string().required(),
  image: string(),
  email: string().email().required(),
  password: passwordValidation,
  confirmPassword: passwordValidation.oneOf(
    [ref("password"), null],
    "Passwords must match"
  ),
});
