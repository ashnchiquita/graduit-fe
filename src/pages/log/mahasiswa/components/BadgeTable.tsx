import { HTMLAttributes, forwardRef} from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Row } from "@tanstack/react-table";
import { MahasiswaLogs } from "@/lib/entity";


export const badgeVariants = cva(
    "flex justify-center items-center font-medium text-xs",
    {
      variants: {
        variant: {
          default: "bg-green-50 text-[#037847]",
          warning: "bg-yellow-50 text-amber-400",
          danger: "bg-red-50 text-red-500",
        },
        size: {
          default: "w-fit px-4 py-1 rounded-full",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  );
  
  interface badgeProps
    extends HTMLAttributes<HTMLDivElement>,
      VariantProps<typeof badgeVariants> {
    row?: Row<MahasiswaLogs>;
  }
  
  export const Badge = forwardRef<HTMLDivElement, badgeProps>(
    ({ row, size, variant, className, ...props }, ref) => {
      const status = row?.original.status ?? "Sah"
        return (
        <>
          <div
            className={cn(badgeVariants({ variant, size, className }))}
            {...props}
            ref={ref}
          >
            <span
              className={`flex w-2 h-2 me-2 ${status == "Sah" ? "bg-[#037847]" : status == "Menunggu" ? "bg-amber-400" : "bg-red-500"} rounded-full`}
            ></span>
            <p className="text-[10px]">{status}</p>
          </div>
        </>
      );
    },
  );
    