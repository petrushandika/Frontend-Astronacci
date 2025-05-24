import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function MembershipPayment() {
  const isLoggedIn = true;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center px-6 py-10 md:px-12 md:py-16 relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Method
          </h1>
          <p className="text-gray-600 text-sm mb-3">
            Please fill in your information to complete the purchase.
          </p>

          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 mb-3">
            <h3 className="font-semibold text-blue-700">Unlimited Plan</h3>
            <p className="text-gray-600 text-sm">Rp 20.000 / month</p>
            <p className="text-gray-500 text-xs mt-1">
              Billed as Rp 20.000 for Access All Articles and Videos
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {isLoggedIn ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </a>
                </p>
              </>
            )}

            <Button
              type="submit"
              className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm mt-3"
            >
              Confirm Payment
            </Button>
          </form>
        </div>
      </div>

      <div className="md:w-1/2 w-full bg-gray-50 hidden md:flex flex-col justify-center items-center px-12 relative">
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

export default MembershipPayment;
