import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserRound,
  FileText,
  PanelsTopLeft,
  CalendarDays,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLogoutMutation } from "../services/authApi";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
    ],
  },
  {
    title: "SALES",
    items: [
      {
        label: "Leads",
        icon: Users,
        path: "/leads",
      },
      {
        label: "Customers",
        icon: UserRound,
        path: "/customers",
      },
      {
        label: "Quotations",
        icon: FileText,
        path: "/quotations",
      },
    ],
  },
  {
    title: "ELEVATOR",
    items: [
      {
        label: "Elevator Configurator",
        icon: PanelsTopLeft,
        path: "/configurator",
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        label: "Site Visits",
        icon: CalendarDays,
        path: "/site-visits",
      },
      {
        label: "Orders",
        icon: ShoppingBag,
        path: "/orders",
      },
    ],
  },
  {
    title: "REPORTS",
    items: [
      {
        label: "Reports",
        icon: BarChart3,
        path: "/reports",
      },
    ],
  },
];

interface SidebarProps {
  activePath?: string;
  onNavigate?: (path: string) => void;
}

const Sidebar = ({ activePath = "/dashboard", onNavigate }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    onNavigate?.(path);
    setMobileOpen(false);
  };

  const [logout] = useLogoutMutation();
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      logoutUser();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={`flex h-24 shrink-0 items-center border-b border-border ${
          collapsed ? "justify-center px-3" : "px-6"
        }`}
      >
        <img
          src="https://alphaelevators.in/new/logo.avif"
          alt="Alpha Elevators"
          className={`object-contain ${
            collapsed ? "h-10 w-10 object-cover object-left" : "h-12 w-auto"
          }`}
        />
      </div>

      {/* Navigation */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.18em] text-text-muted">
                  {section.title}
                </p>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePath === item.path;

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => handleNavigate(item.path)}
                      title={collapsed ? item.label : undefined}
                      className={`
                        group relative flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-left text-sm
                        transition-all duration-200
                        ${collapsed ? "justify-center" : "justify-start"}
                        ${
                          isActive
                            ? "bg-primary-soft text-primary"
                            : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        }
                      `}
                    >
                      {isActive && (
                        <span className="absolute left-0 h-6 w-0.5 rounded-full bg-primary" />
                      )}

                      <Icon size={19} strokeWidth={isActive ? 2 : 1.8} />

                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="shrink-0 border-t border-border p-3">
        <button
          type="button"
          onClick={() => handleNavigate("/settings")}
          title={collapsed ? "Settings" : undefined}
          className={`
            flex w-full items-center gap-3 rounded-xl
            px-3 py-3 text-sm
            text-text-secondary
            transition-colors
            hover:bg-surface-hover hover:text-text-primary
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <Settings size={19} strokeWidth={1.8} />
          {!collapsed && <span>Settings</span>}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`
            mt-1 flex w-full items-center gap-3 rounded-xl
            px-3 py-3 text-sm
            text-text-secondary
            transition-colors
            hover:bg-error/10 hover:text-error
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={19} strokeWidth={1.8} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Desktop collapse */}
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="
            mt-3 hidden w-full items-center justify-center
            rounded-lg border border-border
            py-2 text-text-muted
            transition
            hover:bg-surface-hover hover:text-text-primary
            lg:flex
          "
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <header
        className="
          fixed inset-x-0 top-0 z-40
          flex h-16 items-center
          border-b border-border
          bg-background/95 px-4 backdrop-blur
          lg:hidden
        "
      >
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="
            rounded-lg p-2 text-text-secondary
            transition hover:bg-surface-hover
            hover:text-text-primary
          "
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <img
          src="https://alphaelevators.in/new/logo.avif"
          alt="Alpha Elevators"
          className="ml-3 h-9 w-auto object-contain"
        />
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/60
            lg:hidden
          "
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px]
          border-r border-border
          bg-background
          shadow-2xl
          transition-transform duration-300
          lg:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="
            absolute right-3 top-5 z-10
            rounded-lg p-2
            text-text-muted
            transition
            hover:bg-surface-hover hover:text-text-primary
          "
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>

        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 hidden
          border-r border-border
          bg-background
          transition-[width] duration-300
          lg:block
          ${collapsed ? "w-[76px]" : "w-[250px]"}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
