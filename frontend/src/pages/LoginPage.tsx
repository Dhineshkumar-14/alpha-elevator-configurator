import { useState } from "react";
import { Lock, Phone, ArrowRight, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../services/authApi";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.login);

  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login({
        phoneNumber,
        password,
      }).unwrap();

      // Store logged-in user in Zustand
      loginUser(response.user);

      // Navigate to dashboard
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <img
            src="https://alphaelevators.in/new/logo.avif"
            alt="Alpha Elevators"
            className="mx-auto h-12 w-auto object-contain"
          />

          <p className="mt-4 text-sm text-text-secondary">
            Welcome back. Sign in to continue.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  autoComplete="tel"
                  className="
                    w-full rounded-lg
                    border border-border
                    bg-background-secondary
                    py-2.5 pl-10 pr-3
                    text-sm text-text-primary
                    placeholder:text-text-muted
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="
                    w-full rounded-lg
                    border border-border
                    bg-background-secondary
                    py-2.5 pl-10 pr-10
                    text-sm text-text-primary
                    placeholder:text-text-muted
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                    absolute right-3 top-1/2
                    -translate-y-1/2
                    cursor-pointer
                    text-text-muted
                    transition
                    hover:text-text-primary
                  "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* API Error */}
            {error && (
              <p className="text-sm text-error">
                Invalid phone number or password.
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                flex w-full items-center
                justify-center gap-2
                rounded-lg
                bg-primary
                px-4 py-2.5
                text-sm font-semibold
                text-text-inverse
                transition
                hover:bg-primary-dark
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Alpha Elevators. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
