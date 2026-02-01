import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  imageSrc?: string;
  size?: "icon" | "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  icon: "size-5 text-[10px]",
  xs: "size-7 text-xs",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

export function UserAvatar({
  name,
  imageSrc,
  size = "md",
  className,
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium overflow-hidden",
        sizeClasses[size],
        className,
      )}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
