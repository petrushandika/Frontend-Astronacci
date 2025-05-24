import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import type { Auth } from "@/types/auth.types";

interface RegisterFormProps {
  onSubmit: (data: Auth) => void;
  onGoogleAuth: () => void;
  onFacebookAuth: () => void;
}

function RegisterForm(props: RegisterFormProps): React.JSX.Element {
  const [formData, setFormData] = useState<Auth>({
    name: "",
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
    props.onSubmit(formData);
  };

  return (
    <Card className="border-0 shadow-none p-0">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-right text-xs">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/auth/login"
              className="text-blue-500 text-xs p-0 h-auto font-medium hover:underline"
            >
              Login
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
          >
            Register
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs text-gray-500">
              <span className="px-4 bg-white">Or Continue With</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={props.onGoogleAuth}
              className="flex items-center justify-center gap-2 text-xs"
            >
              <FaGoogle className="text-red-500" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={props.onFacebookAuth}
              className="flex items-center justify-center gap-2 text-xs"
            >
              <FaFacebook className="text-blue-600" />
              Facebook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
