import { FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { useAuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Header() {
  const { user, setUser } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/auth/login";
  };

  const membershipType = user?.membership || "Unknown";
  const tooltipId = "membership-tooltip";

  const getMembershipColor = (): string => {
    if (!user?.membership) return "text-gray-400";

    const validMembership = ["Starter", "Professional", "Unlimited"] as const;
    type MembershipType = (typeof validMembership)[number];

    const membership = validMembership.includes(
      user.membership as MembershipType
    )
      ? (user.membership as MembershipType)
      : null;

    return MEMBERSHIP_COLORS[membership as MembershipType] || "text-gray-400";
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-sm sticky top-0 z-10 px-12 py-6">
      <div className="flex items-center space-x-2">
        <img
          src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747901408/Logo_ybz7ji.png "
          alt="Astronacci International Logo"
          className="h-8 w-auto object-contain"
        />
        <span className="text-lg font-semibold text-gray-800">
          Astronacci International
        </span>
      </div>

      <div className="flex items-center space-x-6 text-gray-700">
        <span className="text-sm font-medium">Hi, {user?.name || "User"}</span>

        <Link
          to="/membership"
          data-tooltip-id={tooltipId}
          className="cursor-pointer"
        >
          <FaUserShield size={20} className={getMembershipColor()} />
        </Link>

        <ReactTooltip
          id={tooltipId}
          content={`You are currently a ${membershipType} member`}
          place="bottom"
          className="px-3 py-2 rounded-md bg-gray-800 text-white text-sm shadow-md"
        />

        <button
          title="Logout"
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800"
          aria-label="Logout"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;

const MEMBERSHIP_COLORS = {
  Starter: "text-yellow-500",
  Professional: "text-blue-500",
  Unlimited: "text-green-500",
} as const;
