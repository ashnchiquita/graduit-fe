import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  HeaderElement?: React.ReactNode;
  ContentElement?: React.ReactNode;
  FooterElement?: React.ReactNode;
  leftHighlight?: boolean;
  collapseable?: boolean;
  initiallyCollapsed?: boolean;
  isTable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      HeaderElement,
      ContentElement,
      FooterElement,
      leftHighlight = false,
      collapseable = false,
      initiallyCollapsed = false,
      isTable = false,
      ...props
    },
    ref,
  ) => {
    // TODO animate open close, refer to radix docs for reference
    const [collapsed, setCollapsed] = React.useState(initiallyCollapsed);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-card border-x-card text-card-foreground py-6 space-y-5 box-border",
          leftHighlight && "border-l-sky-700",
          !isTable && "px-7 border-x-[6px]",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          {HeaderElement}
          {collapseable && (
            <Button
              variant={"outline"}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              Sembunyikan
              {collapsed ? <VscChevronDown /> : <VscChevronUp />}
            </Button>
          )}
        </div>
        {(!collapseable || (collapseable && !collapsed)) && ContentElement}
        {(!collapseable || (collapseable && !collapsed)) && FooterElement}
      </div>
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-medium leading-none tracking-tight text-xl", className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
