// src/app/robots.ts
// Served at /robots.txt by Next.js 13+

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://rkgreenfieldventures.com/sitemap.xml",
    host: "https://rkgreenfieldventures.com",
  };
}