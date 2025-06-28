import { Home, FileText } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Base",
    icon: Home,
    items: [
      { label: "Company", href: "/company" },
      { label: "User", href: "/user" },
      { label: "Role", href: "/role" },
      { label: "Service", href: "/service" },
    ],
  },
  {
    title: "Report",
    icon: FileText,
    items: [
      { label: "By Date", href: "/report/by-date" },
      { label: "By User", href: "/report/by-user" },
    ],
  },
];
