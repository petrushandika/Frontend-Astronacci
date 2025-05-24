import RegisterForm from "@/components/molecules/RegisterForm";
import API from "@/services/api";
import type { Auth } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: Auth) => {
    try {
      const response = await API.AUTH.REGISTER(data);
      console.log("Registration successful:", response);
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleGoogleAuth = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: "http://localhost:3000/api/auth/google/callback",
      scope: "profile email",
      access_type: "offline",
      prompt: "consent",
    });

    console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    window.location.href = googleOAuthUrl;
  };

  return (
    <div className="sm:min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full bg-gray-50 hidden md:flex flex-col justify-center items-center px-12 relative order-2 md:order-1">
        <div className="absolute top-8 left-12 flex items-center">
          <img
            src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747901408/Logo_ybz7ji.png"
            alt="Astronacci International Logo"
            className="h-8 w-auto mr-2 object-contain"
          />
          <span className="text-xl font-semibold text-gray-800">
            Astronacci International
          </span>
        </div>

        <div className="flex flex-col items-center max-w-lg">
          <img
            src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747903978/get-media-removebg-preview_xzdezv.png"
            alt="Trading Interface"
            className="w-96 h-auto"
          />

          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Introducing Astronacci International
          </h1>
          <p className="text-gray-600 text-center leading-relaxed">
            Astronacci International is a leading automated trading robot,
            excelling in algorithmic trading.
          </p>
        </div>
      </div>

      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center px-6 py-6 md:px-12 md:py-0 relative order-1 md:order-2">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Register</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create your free account to access premium features and content.
            </p>
          </div>
          <RegisterForm
            onSubmit={handleSubmit}
            onGoogleAuth={handleGoogleAuth}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
