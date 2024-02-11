export enum SuperUserKeys {
  NAME = "name",
  EMAIL = "email",
  ROLE = 'role',
  PHONE_NUMBER = "phone_number",
  AVATAR = 'avatar',
};

export const SuperUserNumKeys = [];

export const SuperUserStrKeys = [
  SuperUserKeys.NAME,
  SuperUserKeys.EMAIL,
  SuperUserKeys.ROLE,
  SuperUserKeys.AVATAR,
];

export const SuperUserRequiredKeys = [
  SuperUserKeys.NAME,
  SuperUserKeys.PHONE_NUMBER,
  SuperUserKeys.EMAIL,
  SuperUserKeys.ROLE,
];

export const SuperUserUpdateRequiredKeys = [
  SuperUserKeys.ROLE,
];