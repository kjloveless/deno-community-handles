import { type PageProps } from "$fresh/server.ts";

import { siteConfig } from "../config/site.ts";

import MainNav from "../components/main-nav.tsx";
import SiteHeader from "../islands/site-header.tsx";

export default function App({ Component, url }: PageProps) {
  return (
    <html class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>deno-community-handles</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader items={siteConfig.mainNav}>
            <MainNav
              title={url.hostname}
              items={siteConfig.mainNav}
            />
          </SiteHeader>
          <Component />
        </div>
      </body>
    </html>
  );
}
