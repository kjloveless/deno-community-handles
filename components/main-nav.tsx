import { Link } from "../islands/link.tsx";

import { NavItem } from "../types/nav.ts";

import { cn } from "../util/mod.ts";

import { Icons } from "../components/icons.tsx";

interface MainNavProps {
  title: string;
  items?: NavItem[];
}

export default function MainNav({ title, items }: MainNavProps) {
  return (
    <div className="flex gap-6 lg:gap-10">
      <Link href={"/"} className="flex items-center space-x-2">
        <Icons.logo className="size-6" />
        <span className="inline-block font-bold">{title}</span>
      </Link>
      {items?.length
        ? (
          <nav className="hidden gap-4 md:flex lg:gap-6">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                      item.disabled && "cursor-not-allowed opacity-80",
                    )}
                  >
                    {item.title}
                  </Link>
                ),
            )}
          </nav>
        )
        : null}
    </div>
  );
}
