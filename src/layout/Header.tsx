import { useEffect, useState } from "react";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa";
import API from "@/services/api";

function Header() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await API.USER.LOGGED_USER();
        setName(user.name || "User");
      } catch {
        setName("User");
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md sticky top-0 z-10 px-12 py-6">
      <div className="flex items-center space-x-2">
        <img
          src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747901408/Logo_ybz7ji.png"
          alt="Astronacci International Logo"
          className="h-8 w-auto object-contain"
        />
        <span className="text-lg font-semibold text-gray-800">
          Astronacci International
        </span>
      </div>

      <div className="flex items-center space-x-6 text-gray-700">
        <span className="text-sm font-medium">Hi, {name || "User"}</span>

        <button
          title="Membership"
          className="text-blue-600 hover:text-blue-800"
          aria-label="Membership"
        >
          <FaUserShield size={20} />
        </button>

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
