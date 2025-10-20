import React, { useState } from "react";
import { Eye, EyeOff, Mail, User, Lock, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error(t("auth.errors.passwordMismatch"));
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success(t("auth.success.login"));
        navigate("/");
      } else {
        await signup(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );
        toast.success(t("auth.success.register"));
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || t("auth.errors.general"));
      } else {
        toast.error(t("auth.errors.general"));
      }
    }

    setLoading(false);
  };

  const toggleFormMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              {isLogin ? (
                <LogIn className="w-8 h-8 text-indigo-600" />
              ) : (
                <User className="w-8 h-8 text-indigo-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? t("auth.loginTitle") : t("auth.registerTitle")}
            </h1>
            <p className="text-gray-600">
              {isLogin ? t("auth.loginSubtitle") : t("auth.registerSubtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("auth.firstName")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required={!isLogin}
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder={t("auth.firstNamePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("auth.lastName")}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required={!isLogin}
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder={t("auth.lastNamePlaceholder")}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("auth.email")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="siz@example.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("auth.password")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder={
                    isLogin
                      ? t("auth.passwordPlaceholder")
                      : t("auth.passwordMinLength")
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("auth.confirmPassword")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder={t("auth.confirmPasswordPlaceholder")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} className="text-gray-400" />
                    ) : (
                      <Eye size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition font-medium disabled:opacity-50"
            >
              {loading
                ? t("auth.loading")
                : isLogin
                ? t("auth.loginButton")
                : t("auth.registerButton")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
              <button
                type="button"
                onClick={toggleFormMode}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                {isLogin ? t("auth.registerHere") : t("auth.loginHere")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
