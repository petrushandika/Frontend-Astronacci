import { MEMBERSHIP_LIMITS } from "@/config/membershipLimits";

type MembershipRole = "starter" | "professional" | "unlimited";

const isValidRole = (role: any): role is MembershipRole => {
  return ["starter", "professional", "unlimited"].includes(role);
};

export function useMembership() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const rawRole = user.membership;

  const role = isValidRole(rawRole) ? rawRole : "starter";

  const limits = MEMBERSHIP_LIMITS[role];

  return {
    role,
    limits,
  };
}
