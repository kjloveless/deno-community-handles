import { RouteContext } from "$fresh/src/server/mod.ts";

import { Profile } from "../../components/profile.tsx";

import { handleOwner } from "../../types/model.ts";

import { agent } from "../../util/atproto.ts";

const kv = await Deno.openKv();

export default async function HandlePage(_req: Request, ctx: RouteContext) {
  // const domain = ctx.url.hostname;
  const { handle } = ctx.params;

  try {
    const user = (await kv.get(["handle", handle])).value as handleOwner;
    const profile = await agent.getProfile({
      actor: user.did,
    });

    return (
      <div className="grid flex-1 place-items-center">
        <a href={`https://bsky.app/profile/${profile.data.handle}`}>
          <Profile profile={profile.data} />
        </a>
      </div>
    );
  } catch (e) {
    console.error(e);
    return (
      <div className="grid flex-1 place-items-center">
        <p className="text-center">Profile not found</p>
      </div>
    );
  }
}
