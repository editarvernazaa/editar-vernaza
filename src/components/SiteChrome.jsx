"use client";

import { usePathname } from "next/navigation";

export default function SiteChrome({ header, footer, children }) {
  const pathname = usePathname();
  const esAdmin = pathname.startsWith("/admin");
  if (esAdmin) {
    return <div className="flex-1">{children}</div>;
  }
  return (
    <>
      {" "}
      {header}
      <div className="flex-1">{children}</div> {footer}{" "}
    </>
  );
}
