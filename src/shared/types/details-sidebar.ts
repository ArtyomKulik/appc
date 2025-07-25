export type DetailsSidebarFormType = "userDetails" | null;

export type UserDetailsType = {
  id: number | null;
  name: string;
  email: string;
};

export type UserDetailsFormDataType = Omit<UserDetailsType, "id">;

export type DetailsSidebarPropsType = {
  formType: DetailsSidebarFormType | null;
  formData: UserDetailsType | null;
};
