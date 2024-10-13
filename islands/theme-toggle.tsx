import { useSignal } from "@preact/signals";

import { Button } from "../components/ui/Button.tsx";
import { Icons } from "../components/icons.tsx";

export function ThemeToggle() {
  const theme = useSignal("light");

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        theme.value = theme.value === "light" ? "dark" : "light";
        console.log(theme.value);
      }}
    >
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
