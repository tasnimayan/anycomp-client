import { UserAvatar } from "@/components/shared";
import { Bell, Mail } from "lucide-react";

export function UserActions() {
  return (
    <>
      <button
        className="relative text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Messages"
      >
        <Mail className="size-4" />
      </button>

      <button
        className="relative text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute top-0.25 right-0.25 size-1.5 bg-destructive rounded-full" />
      </button>

      <UserAvatar name="Gwen Lam" size="icon" />
    </>
  );
}
