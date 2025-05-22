import RegisterForm from "@/components/molecules/RegisterForm";
import type { Auth } from "@/types/auth.types";

function LoginPage() {
  const handleSubmit = (data: Auth) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="sm:min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Side - Illustration */}
      <div className="md:w-1/2 w-full bg-gray-50 hidden md:flex flex-col justify-center items-center px-12 relative order-2 md:order-1">
        <div className="absolute top-8 left-12 flex items-center">
          <img
            src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747901408/Logo_ybz7ji.png "
            alt="Astronacci International Logo"
            className="h-8 w-auto mr-2 object-contain"
          />
          <span className="text-xl font-semibold text-gray-800">
            Astronacci International
          </span>
        </div>

        <div className="flex flex-col items-center max-w-lg mt-20">
          <div className="mb-12">
            <img
              src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747903978/get-media-removebg-preview_xzdezv.png "
              alt="Trading Interface"
              className="w-96 h-auto"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Introducing Astronacci International
          </h1>
          <p className="text-gray-600 text-center leading-relaxed">
            Astronacci International is a leading automated trading robot,
            excelling in algorithmic trading.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center px-6 py-6 md:px-12 md:py-0 relative order-1 md:order-2">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Register</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create your free account to access premium features and content.
            </p>
          </div>

          <RegisterForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
