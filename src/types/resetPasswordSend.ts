export interface ResetPasswordSendInput {
  email: string;
}

// new
export interface ResetPasswordInput {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}
