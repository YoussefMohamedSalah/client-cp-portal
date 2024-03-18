export const profileName = (user: any): string => {
  let name: string = user?.name || "admin";
  return name;
};

// export const profileUserName = (session: any): string => {
//   return session?.user?.business_title || "user";
// };

export const profileEmail = (session: any): string => {
  return session?.user?.email || "admin@example.com";
};
