import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { getDomain } from "../util/mod.ts";

export function Link(
  { href, ...props }: JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  if (
    IS_BROWSER && typeof href === "string" && typeof window !== "undefined"
  ) {
    const { subdomain, domain } = getDomain(window.location.hostname);
    console.log(subdomain, domain);
    if (subdomain) {
      return <a href={`https://${domain}${href}`} {...props} />;
    } else {
      return <a href={href} {...props} />;
    }
  } else {
    return <a href={href} {...props} />;
  }
}
