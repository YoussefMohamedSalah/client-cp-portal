export enum SignInKeys {
  EMAIL = "email",
  PASSWORD = "password",
}
export const SignInRequiredKeys = [SignInKeys.EMAIL, SignInKeys.PASSWORD];

export enum SignUpKeys {
  NAME = "name",
  EMAIL = "email",
  PHONE_NUMBER = "phone_number",
  PASSWORD = "password",
}

export const SignUpRequiredKeys = [SignUpKeys.NAME, SignUpKeys.EMAIL, SignUpKeys.PHONE_NUMBER, SignUpKeys.PASSWORD];
