// src/pages/LoginPage.jsx
import { useState } from "react";
import { Mail, Lock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuthSubmit = (loginType = "user") => (e) => {
    if (e) e.preventDefault();
    
    if (loginType === "user") {
      // Basic validation for user login/registration
      if (isRegistering && authForm.password !== authForm.confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      
      if (!authForm.email || !authForm.password) {
        setError("Please fill in all fields");
        return;
      }
    }

    console.log("Auth form submitted:", authForm);
    
    // In a real app, you would handle authentication here
    // For demo purposes, we'll just redirect to the home page with login type
    navigate("/", { state: { loginType } });
  };

  const handleGuestLogin = () => {
    handleAuthSubmit("guest")();
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src="techflow_logo.png" className="w-[65%] h-auto" />
          </div>
          <h2 className="text-md font-normal text-gray-700 mt-8 mb-2 mx-2">
            {isRegistering
              ? "To use Tecflow you must create an account"
              : "To use Tecflow you must log into your account using one of the options below"}
          </h2>

          {/* Guest Login Button */}
          <button 
            onClick={handleGuestLogin}
            className="bg-gray-200 text-blue-500 text-xs font-small py-2 px-4 m-2 rounded-full hover:bg-gray-300 transition duration-200"
          >
            Continue as Guest
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthSubmit("user")} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                id="email"
                name="email"
                value={authForm.email}
                onChange={handleAuthChange}
                className="w-full pl-10 pr-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required={!isRegistering}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                id="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthChange}
                className="w-full pl-10 pr-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required={!isRegistering}
                minLength={6}
              />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={authForm.confirmPassword}
                  onChange={handleAuthChange}
                  className="w-full pl-10 pr-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-[#648cdc] transition-colors font-medium"
          >
            {isRegistering ? "Create Account" : "Sign In"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAuthSubmit("user")}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isRegistering ? "Sign in" : "Create one"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;