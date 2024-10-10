import { signal } from "@preact/signals";

import { cn } from "../util/mod.ts";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export function Avatar({ src, alt, fallback, className }: AvatarProps) {
  const loaded = signal(false);

  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
    >
      {src && (
        <img
          className="aspect-square size-full"
          src={src.replace("avatar", "avatar_thumbnail")}
          alt={alt}
          onLoad={() => loaded.value = true}
        />
      )}
      {!loaded && (
        <div className="absolute inset-0 flex size-full items-center justify-center rounded-full border bg-muted text-[120%]">
          {fallback}
        </div>
      )}
    </div>
  );
}
