export interface User {
  name: string;
  email: string;
  membership: MembershipType;
}

export type MembershipType = "Starter" | "Professional" | "Unlimited";
