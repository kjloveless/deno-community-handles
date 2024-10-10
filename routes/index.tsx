import { AppBskyActorDefs } from "@atproto/api";
// import { Check, X } from "lucide-react"; need to fix these

import { hasExplicitSlur } from "../util/slurs.ts";
import { agent } from "../util/atproto.ts";

import { Stage } from "../components/stage.tsx";
import { Profile } from "../components/profile.tsx";

import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/Button.tsx";
import { RouteContext } from "$fresh/src/server/mod.ts";

import { RESERVED } from "../util/mod.ts";

const kv = await Deno.openKv();

interface mapValue {
  handle: string;
  did: string;
  domain: {
    name: string;
  };
}

export default async function HomePage(_req: Request, ctx: RouteContext) {
  const domain = ctx.url.hostname;
  let handle = ctx.url.searchParams.get("handle") || "";
  let newHandle = ctx.url.searchParams.get("new-handle") || "";
  let profile: AppBskyActorDefs.ProfileView | undefined;
  let error1: string | undefined;
  let error2: string | undefined;

  if (handle) {
    try {
      if (!handle.includes(".")) {
        handle += ".bsky.social";
      }
      console.log("fetching profile", handle);
      const actor = await agent.getProfile({
        actor: handle,
      });
      if (!actor.success) throw new Error("fetch was not a success");
      profile = actor.data;
    } catch (e) {
      console.error(e);
      error1 = (e as Error)?.message ?? "unknown error";
    }

    if (newHandle && profile) {
      newHandle = newHandle.trim().toLowerCase();
      if (!newHandle.includes(".")) {
        newHandle += "." + domain;
      }
      if (!error1) {
        // regex: (alphanumeric, -, _).(domain)
        const validHandle = newHandle.match(
          new RegExp(`^[a-zA-Z0-9-_]+.${domain}$`),
        );
        if (validHandle) {
          try {
            const handle = newHandle.replace(`.${domain}`, "");
            if (hasExplicitSlur(handle)) {
              throw new Error("slur");
            }

            if (domain === "army.social" && RESERVED.includes(handle)) {
              throw new Error("reserved");
            }

            const existing = (await kv.get(["handle", handle]))
              .value as mapValue;
            if (existing && existing.domain.name === domain) {
              if (existing.did !== profile.did) {
                error2 = "handle taken";
              }
            } else {
              const updatedHandle: mapValue = {
                handle: handle,
                did: profile.did,
                domain: {
                  name: domain,
                },
              };
              await kv.set(["handle", handle], updatedHandle);
            }
          } catch (e) {
            console.error(e);
            error2 = (e as Error)?.message ?? "unknown error";
          }
        } else {
          error2 = "invalid handle";
        }
      }
    }
  }
  return (
    <main className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Get your own {domain} <br className="hidden sm:inline" />
          handle for Bluesky!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Follow the instructions below to get your own {domain} handle.
        </p>
      </div>
      <div>
        <Stage title="Enter your current handle" number={1}>
          <form>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex w-full max-w-sm items-center space-x-2">
                {newHandle && (
                  <input
                    type="hidden"
                    name="new-handle"
                    value=""
                  />
                )}
                <Input
                  type="text"
                  name="handle"
                  placeholder="example.bsky.social"
                  defaultValue={handle}
                  required
                />
                <Button type="submit">Submit</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your current handle, not including the @
              </p>
              {error1 && (
                <p className="flex flex-row items-center gap-2 text-sm text-red-500">
                  Handle not found - please try again
                </p>
              )}
              {profile && (
                <>
                  <p className="text-muted-forground mt-4 flex flex-row items-center gap-2 text-sm">
                    Account found
                  </p>
                  <Profile profile={profile} />
                </>
              )}
            </div>
          </form>
        </Stage>
        <Stage title="Choose your new handle" number={2} disabled={!profile}>
          <form>
            <input type="hidden" name="handle" value={handle} />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="text"
                  name="new-handle"
                  placeholder={`example.${domain}`}
                  defaultValue={newHandle}
                />
                <Button type="submit">Submit</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the {domain}{" "}
                handle that you would like to have, not including the @
              </p>
              {error2 && (
                <p className="text-sm text-red-500">
                  {(() => {
                    switch (error2) {
                      case "handle taken":
                        return "Handle already taken - please enter a different handle";
                      case "invalid handle":
                      case "slur":
                        return "Invalid handle - please enter a different handle";
                      case "reserved":
                        return "Reserved handle - please enter a different handle";
                      default:
                        return "An error occured - please try again";
                    }
                  })()}
                </p>
              )}
            </div>
          </form>
        </Stage>
        <Stage
          title="Change your handle within the Bluesky app"
          number={3}
          disabled={!newHandle || !!error2}
          last
        >
          <p className="max-w-lg text-sm">
            Go to Settings {">"} Advanced {">"}{" "}
            Change my handle. Select &quot;I have my own domain&quot; and enter
            {" "}
            {newHandle ? `"${newHandle}"` : "your new handle"}. Finally, tap
            &quot;Verify DNS Record&quot;.
          </p>
          <p className="mt-6 max-w-lg text-sm">
            If you like this project, consider{" "}
            <a href="https://github.com/sponsors/mozzius" className="underline">
              sponsoring the original creator, mozzius
            </a>
            .
          </p>
        </Stage>
      </div>
    </main>
  );
}
