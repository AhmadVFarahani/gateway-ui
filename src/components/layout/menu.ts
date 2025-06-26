import { Home, FileText } from "lucide-react";

export const sidebarMenu = [
  {
    title: "Base",
    icon: Home,
    items: [
      { label: "Company", href: "/company" },
      { label: "User", href: "/user" },
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
