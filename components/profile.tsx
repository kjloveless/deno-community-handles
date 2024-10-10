import { AppBskyActorDefs } from "@atproto/api";

import { Avatar } from "./avatar.tsx";

import { cn } from "../util/mod.ts";

interface Props {
  profile: AppBskyActorDefs.ProfileViewDetailed;
  className?: string;
}

export function Profile({ profile, className }: Props) {
  return (
    <div
      className={cn(
        "flex w-full max-w-lg flex-col overflow-hidden rounded-xl shadow",
        className,
      )}
    >
      {profile.banner
        ? (
          <img
            src={profile.banner}
            alt=""
            className="aspect-[3/1] w-full bg-muted object-cover"
          />
        )
        : <div className="aspect-[3/1] w-full bg-muted" />}
      <div className="flex flex-col border-x border-b bg-background px-3 pb-2">
        <Avatar
          className="relative -top-8 -mb-6 size-16"
          src={profile.avatar}
          alt={`@${profile.handle}'s avatar`}
          fallback={profile.handle.toLocaleUpperCase().at(0)}
        />
        <p className="line-clamp-1 text-lg font-semibold leading-5">
          {profile.displayName || profile.handle}
        </p>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          @{profile.handle}
        </p>
      </div>
    </div>
  );
}
