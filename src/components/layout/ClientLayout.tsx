"use client";

import { usePathname } from "next/navigation";
import AppLayout from "./AppLayout";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutPaths =
    ["/id/signin",
      "/id/signup",
      "/id/forgot-password",
      "/id/dashboard",
      "/id/dashboard/internship",
      "/id/dashboard/messages",
      "/id/dashboard/logbook",
      "/id/dashboard/profile",
      "/id/dashboard/settings",
      "/id/dashboard/notifications",
      "/id/dashboard/help",
      "/id/dashboard/logout",
      "/id/dashboard/jobs",
      "/id/dashboard/magang",
      "/id/dashboard/pendidikan",
      "/id/dashboard/members",
      "/id/dashboard/blogs",
      "/id/dashboard/favorites"
    ];

  const dashboardPaths =
    ["/id"];

  if (
    noLayoutPaths.includes(pathname) ||
    pathname.startsWith("/id/dashboard") ||
    pathname.startsWith("/id/dashboard/projects")
  ) {
    return <>{children}</>;
  }

  if (dashboardPaths.some((p) => pathname.startsWith(p))) {
    return <AppLayout>{children}</AppLayout>;
  }

  // landing page
  return <>{children}</>;
}
