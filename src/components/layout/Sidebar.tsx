"use client";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { sidebarMenu } from "./menu";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="p-2 m-2 md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 bg-gray-100 border-r p-4 h-screen overflow-y-auto`}
      >
        {sidebarMenu.map((section) => {
          const isSectionOpen = openSections[section.title];

          return (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full px-3 py-2 font-semibold text-left bg-white rounded hover:bg-gray-200 transition"
              >
                <div className="flex items-center space-x-2">
                  <section.icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </div>
                {isSectionOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Sub items */}
              {isSectionOpen && (
                <div className="mt-2 space-y-1 ml-6">
                  {section.items.map((item) => {
                    console.log("item", item);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}
