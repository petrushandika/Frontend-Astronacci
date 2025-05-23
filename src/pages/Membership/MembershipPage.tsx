import { Button } from "@/components/ui/button";
import type { Auth } from "@/types/auth.types";
import { Link } from "react-router-dom";

function MembershipPage() {
  const handleSubmit = (data: Auth) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="sm:min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center px-6 py-6 md:px-12 md:py-0 relative order-1 md:order-1">
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

        <div className="max-w-md mx-auto w-full">
          <div className="mb-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Gain unlimited access to all of The Times.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create your free account to access premium features and content.
            </p>
          </div>

          <div className="space-y-3">
            <div className="border p-4 rounded-lg hover:border-blue-200 bg-blue-50 transition">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="starter"
                  name="subscription"
                  className="mr-2"
                />
                <label
                  htmlFor="starter"
                  className="font-semibold text-blue-700"
                >
                  Starter Plan
                </label>
              </div>
              <p className="text-gray-600 text-sm">Free</p>
              <p className="text-gray-500 text-xs mt-1">
                Billed as Rp 0 for 3 Article and 3 Video
              </p>
            </div>

            <div className="border p-4 rounded-lg hover:border-blue-200 bg-blue-50 transition">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="professional"
                  name="subscription"
                  className="mr-2"
                />
                <label
                  htmlFor="professional"
                  className="font-semibold text-blue-700"
                >
                  Professional Plan
                </label>
              </div>
              <p className="text-gray-600 text-sm">Rp 10.000 / month</p>
              <p className="text-gray-500 text-xs mt-1">
                Billed as Rp 10.000 for 10 Article and 10 Video
              </p>
            </div>

            <div className="border p-4 rounded-lg hover:border-blue-200 bg-blue-50 transition">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="unlimited"
                  name="subscription"
                  className="mr-2"
                />
                <label
                  htmlFor="unlimited"
                  className="font-semibold text-blue-700"
                >
                  Unlimited Plan
                </label>
              </div>
              <p className="text-gray-600 text-sm">Rp 20.000 / month</p>
              <p className="text-gray-500 text-xs mt-1">
                Billed as Rp 20.000 for Access All Articles and Videos
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm mt-3"
          >
            <Link to={"/membership/payment"}>Become A Member Now</Link>
          </Button>
        </div>
      </div>

      <div className="md:w-1/2 w-full bg-gray-50 hidden md:flex flex-col justify-center items-center px-12 relative order-2 md:order-2">
        <div className="flex flex-col items-center max-w-lg">
          <div className="">
            <img
              src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747903978/get-media-removebg-preview_xzdezv.png "
              alt="Trading Interface"
              className="w-96 h-auto"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            You're All Set!
          </h1>
          <p className="text-gray-600 text-center leading-relaxed">
            Your Unlimited plan will unlock all articles and videos instantly
            after payment confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;
