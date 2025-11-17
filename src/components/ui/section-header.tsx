import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12", className)}>
      <h2
        className={cn(
          "text-2xl md:text-3xl font-semibold text-primary font-brand mb-2",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-secondary leading-relaxed text-balance",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
