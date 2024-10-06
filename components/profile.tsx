import { AppBskyActorDefs } from "@atproto/api";

interface Props {
  profile: AppBskyActorDefs.ProfileViewDetailed;
}

export function Profile({ profile }: Props) {
  return (
    <div className="flex w-full max-q-lg flex-col overflow-hidden rounded-xl shadow">
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
