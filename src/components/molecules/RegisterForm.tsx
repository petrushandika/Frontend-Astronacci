import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import type { Auth } from "@/types/auth.types";

interface RegisterFormProps {
  onSubmit: (data: Auth) => void;
}

function RegisterForm(props: RegisterFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<Auth>({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password) {
      alert("Passwords do not match!");
      return;
    }

    props.onSubmit(formData);
  };

  return (
    <Card className="border-0 shadow-none p-0">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full h-10 px-3 bg-gray-50 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              required
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full h-10 px-3 bg-gray-50 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full h-10 px-3 bg-gray-50 border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Already have account? */}
          <div className="text-right">
            <span className="text-gray-600 text-xs">
              Already have an account?{" "}
            </span>
            <Button
              variant="link"
              className="text-blue-500 text-xs p-0 h-auto font-medium hover:underline"
            >
              <Link to={"/auth/login"}>Login</Link>
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
          >
            Register
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs text-gray-500">
              <span className="px-4 bg-white">Or Continue With</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-10 border-gray-200 hover:bg-gray-50 flex items-center justify-center space-x-2 text-xs"
            >
              <FaGoogle className="w-4 h-4 text-red-500" />
              <span>Google</span>
            </Button>

            <Button
              variant="outline"
              className="h-10 border-gray-200 hover:bg-gray-50 flex items-center justify-center space-x-2 text-xs"
            >
              <FaFacebook className="w-4 h-4 text-blue-600" />
              <span>Facebook</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
