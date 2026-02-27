"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AppLayout from "./AppLayout";
import CookieConsent from "./CookieConsent";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDashboardView = searchParams.get('view') === 'dashboard';

  const noLayoutPaths = [
    "/id/signin",
    "/id/signup",
    "/id/forgot-password",
    "/id/dashboard/internship",
    "/id/dashboard/messages",
    "/id/dashboard/logbook",
    "/id/dashboard/profile",
    "/id/dashboard/settings",
    "/id/dashboard/notifications",
    "/id/dashboard/help",
    "/id/dashboard/logout",
    "/id/dashboard/members",
    "/id/dashboard/blogs",
    "/id/dashboard/favorites",
    "/id/tambah-organisasi",
    "/id/organizations/dashboard",
  ];

  if (
    noLayoutPaths.includes(pathname) ||
    pathname.startsWith("/id/dashboard") ||
    pathname.startsWith("/id/dashboard/projects") ||
    pathname.startsWith("/id/organizations") ||
    isDashboardView
  ) {
    return (
      <>
        {children}
        <CookieConsent />
      </>
    );
  }

  const dashboardPaths = ["/id"];

  if (dashboardPaths.some((p) => pathname.startsWith(p))) {
    return (
      <AppLayout>
        {children}
        <CookieConsent />
      </AppLayout>
    );
  }

  // landing page
  return (
    <>
      {children}
      <CookieConsent />
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <LayoutContent>
        {children}
      </LayoutContent>
    </Suspense>
  );
}
