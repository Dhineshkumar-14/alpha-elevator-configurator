// routeConfig.ts

export const routeConfig: Record<
  string,
  {
    title: string;
    subtitle?: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your sales activity",
  },

  "/configurator": {
    title: "Elevator Configurator",
    subtitle: "Customize your elevator design",
  },

  "/leads": {
    title: "Leads",
    subtitle: "Manage and track your sales leads",
  },

  "/customers": {
    title: "Customers",
    subtitle: "Manage your customer information",
  },

  "/projects": {
    title: "Projects",
    subtitle: "Manage your ongoing projects",
  },
};