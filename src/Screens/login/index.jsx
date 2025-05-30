// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { Mail, Lock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Add this useEffect to check for Google auth response when component mounts
  useEffect(() => {
    const handleGoogleAuthResponse = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const error = params.get("error");
      const userJson = params.get("user");
      if (error) {
        setError(decodeURIComponent(error));
        // Clean the URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        return;
      }

      if (token && userJson) {
        try {
          setIsLoading(true);
          const user = JSON.parse(decodeURIComponent(userJson));

          // Dispatch login success
          dispatch(
            loginSuccess({
              token: token,
              user: user,
            })
          );

          // Clean the URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          // Redirect to home
          navigate("/", { state: { loginType: "user" } });
        } catch (err) {
          setError(t("login_page.errors.google_failed"));
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleGoogleAuthResponse();
  }, [dispatch, navigate]);


  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch("https://backend.tecflow.kr/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const handleAuthSubmit = async (loginType = "user") => {
    if (loginType === "user") {
      // Basic validation for user login/registration
      if (isRegistering && authForm.password !== authForm.confirmPassword) {
        setError(t("login_page.errors.passwords_match"));
        return;
      }

      if (
        !authForm.email ||
        !authForm.password ||
        (isRegistering && !authForm.name)
      ) {
        setError(t("login_page.errors.fill_all"));
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        let response;
        if (isRegistering) {
          // Handle registration
          response = await fetch("https://backend.tecflow.kr/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: authForm.name,
              email: authForm.email,
              password: authForm.password,
              confirm_password: authForm.confirmPassword,
            }),
          });
        } else {
          // Handle login
          response = await fetch("https://backend.tecflow.kr/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: authForm.email,
              password: authForm.password,
            }),
          });
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t("login_page.errors.auth_failed"));
        }

        // Fetch and store user data
        const userData = await fetchCurrentUser(data.token);

        dispatch(
          loginSuccess({
            token: data.token,
            user: userData.user,
          })
        );

        // Redirect to home page
        navigate("/", { state: { loginType: "user" } });
      } catch (err) {
        setError(err.message || "An error occurred during authentication");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Guest login
      navigate("/", { state: { loginType: "guest" } });
    }
  };
  const handleAuthSubmitWithGoogle = async (loginType = "user") => {
    if (loginType === "user") {
      setError(""); // Clear any previous errors
      setIsLoading(true);
      try {
        // Open Google auth in same tab
        window.location.href = "https://backend.tecflow.kr/auth/google";
      } catch (err) {
        setError(t("login_page.errors.google_failed"));
        setIsLoading(false);
      }
    } else {
      // Guest login
      navigate("/", { state: { loginType: "guest" } });
    }
  };

  const handleGuestLogin = () => {
    handleAuthSubmit("guest");
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
              ? t("login_page.messages.register_required")
              : t("login_page.messages.login_required")}
          </h2>

          {/* Guest Login Button */}
          <button
            onClick={handleGuestLogin}
            className="bg-gray-200 text-blue-500 text-xs font-small py-2 px-4 m-2 rounded-full hover:bg-gray-300 transition duration-200"
            disabled={isLoading}
          >
            {t("login_page.continue_guest")}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAuthSubmit("user");
          }}
          className="space-y-4"
        >
          {isRegistering && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("login_page.full_name")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={authForm.name}
                  onChange={handleAuthChange}
                  className="w-full px-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("login_page.email_address")}
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
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("login_page.password")}
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
                required
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
                {t("login_page.confirm_password")}
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
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-[#648cdc] transition-colors font-medium disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading
              ? t("login_page.processing")
              : isRegistering
              ? t("login_page.create_account")
              : t("login_page.sign_in")}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t("login_page.or_continue_with")}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleAuthSubmitWithGoogle("user")}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? (
              t("login_page.processing")
            ) : (
              <>
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                />
                {t("login_page.continue_google")}
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isRegistering
              ? t("login_page.already_account")
              : t("login_page.no_account")}{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
              disabled={isLoading}
            >
              {isRegistering
                ? t("login_page.sign_in")
                : t("login_page.create_one")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
