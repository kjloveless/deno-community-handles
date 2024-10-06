import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

interface mapValue {
  handle: string;
  did: string;
  domain: {
    name: string;
  };
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const handle = ctx.params.handle;
    const { did } = (await kv.get(["handle", handle])).value as mapValue;
    return new Response(did, {
      headers: {
        "content-type": "text/plain",
      }
    });
  },
};
