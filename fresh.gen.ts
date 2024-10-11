// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_handle_well_known_atproto_did from "./routes/[handle]/.well-known/atproto-did.ts";
import * as $_handle_index from "./routes/[handle]/index.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $community_index from "./routes/community/index.tsx";
import * as $create_your_own from "./routes/create-your-own.tsx";
import * as $index from "./routes/index.tsx";
import * as $link from "./islands/link.tsx";
import * as $site_header from "./islands/site-header.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[handle]/.well-known/atproto-did.ts":
      $_handle_well_known_atproto_did,
    "./routes/[handle]/index.tsx": $_handle_index,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/community/index.tsx": $community_index,
    "./routes/create-your-own.tsx": $create_your_own,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/link.tsx": $link,
    "./islands/site-header.tsx": $site_header,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
