import "next-auth";

type UserRole = "admin" | "super_admin" | "user";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      permissions: Record<string, unknown>;
      createdAt: string;
      updatedAt: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    permissions: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
  }
} 