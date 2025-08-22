export interface User {
  id: string | number;
  name: string;
  role: "Teacher" | "Student" | "Admin";
  avatar?: string;
  initials: string;
  topInterests?: string[];
  rating?: number;
  sessions?: number;
}