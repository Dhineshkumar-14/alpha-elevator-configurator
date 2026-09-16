import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Menu, Settings, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../services/authApi";
import { useAuthStore } from "../store/authStore";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

const Header = ({
  title = "Dashboard",
  subtitle,
  onMenuClick,
}: HeaderProps) => {
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout);

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logoutUser();
      navigate("/login", { replace: true });
    }
  };

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  const userName = user?.name || "User";
  const userRole = user?.role || "Employee";

  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <header
      className="
        sticky top-0 z-20
        h-16 sm:h-[72px]
        border-b border-border
        bg-background/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex h-full items-center justify-between
          gap-3
          px-3 sm:px-5 lg:px-8
        "
      >
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              border border-border
              bg-surface
              text-text-secondary
              transition
              hover:bg-surface-hover
              hover:text-text-primary
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu size={19} strokeWidth={1.8} />
          </button>

          {/* Page Title */}
          <div className="min-w-0">
            <h1
              className="
                truncate
                text-base font-semibold
                text-text-primary
                sm:text-lg
              "
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className="
                  hidden truncate
                  max-w-[280px]
                  text-xs
                  text-text-muted
                  sm:block
                "
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <button
            type="button"
            className="
              relative
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-text-secondary
              transition
              hover:bg-surface-hover
              hover:text-text-primary
            "
            aria-label="Notifications"
          >
            <Bell size={19} strokeWidth={1.8} />

            {/* Notification indicator */}
            <span
              className="
                absolute right-1.5 top-1.5
                h-1.5 w-1.5
                rounded-full
                bg-primary
                ring-2 ring-background
              "
            />
          </button>

          {/* Divider */}
          <div className="hidden h-7 w-px bg-border sm:block" />

          {/* PROFILE */}
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              className="
                flex items-center
                gap-1.5 sm:gap-2
                rounded-lg
                p-1
                transition
                hover:bg-surface-hover
              "
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              {/* Avatar */}
              <div
                className="
                  flex h-8 w-8
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-primary-soft
                  text-xs font-semibold
                  text-primary
                "
              >
                {avatarLetter}
              </div>

              {/* User Information */}
              <div className="hidden text-left lg:block">
                <p
                  className="
                    max-w-28 truncate
                    text-xs font-medium
                    text-text-primary
                  "
                >
                  {userName}
                </p>

                <p
                  className="
                    max-w-28 truncate
                    text-[10px]
                    capitalize
                    text-text-muted
                  "
                >
                  {userRole}
                </p>
              </div>

              {/* Chevron */}
              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className={`
                  hidden
                  text-text-muted
                  transition-transform
                  lg:block
                  ${profileOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* PROFILE DROPDOWN */}
            {profileOpen && (
              <div
                className="
                  absolute right-0 top-[calc(100%+8px)]
                  z-50
                  w-[calc(100vw-24px)]
                  max-w-64
                  overflow-hidden
                  rounded-xl
                  border border-border
                  bg-surface
                  shadow-lg
                "
              >
                {/* User Info */}
                <div className="border-b border-border px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-10 w-10
                        shrink-0
                        items-center justify-center
                        rounded-full
                        bg-primary-soft
                        text-sm font-semibold
                        text-primary
                      "
                    >
                      {avatarLetter}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm font-medium
                          text-text-primary
                        "
                      >
                        {userName}
                      </p>

                      <p
                        className="
                          truncate
                          text-xs capitalize
                          text-text-muted
                        "
                      >
                        {userRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-2">
                  {/* Profile */}
                  <button
                    type="button"
                    onClick={handleProfile}
                    className="
                      flex w-full items-center gap-3
                      rounded-lg
                      px-3 py-2.5
                      text-sm
                      text-text-secondary
                      transition
                      hover:bg-surface-hover
                      hover:text-text-primary
                    "
                  >
                    <User size={17} strokeWidth={1.8} />

                    <span>My Profile</span>
                  </button>

                  {/* Settings */}
                  <button
                    type="button"
                    onClick={handleSettings}
                    className="
                      flex w-full items-center gap-3
                      rounded-lg
                      px-3 py-2.5
                      text-sm
                      text-text-secondary
                      transition
                      hover:bg-surface-hover
                      hover:text-text-primary
                    "
                  >
                    <Settings size={17} strokeWidth={1.8} />

                    <span>Settings</span>
                  </button>

                  {/* Divider */}
                  <div className="my-2 h-px bg-border" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="
                      flex w-full items-center gap-3
                      rounded-lg
                      px-3 py-2.5
                      text-sm
                      text-error
                      transition
                      hover:bg-error/10
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <LogOut size={17} strokeWidth={1.8} />

                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
