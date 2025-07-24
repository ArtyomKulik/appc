export type DetailsSidebarFormType = "userDetails" | null;

export interface DetailsSidebarPropsType<T = unknown> {
  formType: DetailsSidebarFormType;
  formData: T | null;
}
