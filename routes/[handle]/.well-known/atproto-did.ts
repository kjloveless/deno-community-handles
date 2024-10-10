import { Handlers } from "$fresh/server.ts";

import { handleOwner } from "../../../types/model.ts";

const kv = await Deno.openKv();

export const handler: Handlers = {
  async GET(_req, ctx) {
    const handle = ctx.params.handle;
    const { did } = (await kv.get(["handle", handle])).value as handleOwner;
    return new Response(did, {
      headers: {
        "content-type": "text/plain",
      },
    });
  },
};
