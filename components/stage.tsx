import { ComponentChildren } from "preact";

import { cn } from "../util/mod.ts";

interface HTMLStageElement {
  number: number;
  title: string;
  disabled?: boolean;
  last?: boolean;
  children?: ComponentChildren;
}

export function Stage(
  { number, title, disabled, last, children }: HTMLStageElement,
) {
  return (
    <section className={cn(disabled && "opacity-50")}>
      <div className="flex h-8 flex-row items-center">
        <div className="mr-4 grid size-8 shrink-0 place-items-center rounded-full 
                  bg-slate-100 text-center dark:bg-slate-800">
          {number}
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div
        className={cn(
          "border-l-1 ml-4 border-l py-6 pl-8",
          last && "border-transparent",
        )}
      >
        {children}
      </div>
    </section>
  );
}
