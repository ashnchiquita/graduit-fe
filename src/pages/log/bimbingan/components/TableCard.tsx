import { cn } from "@/lib/utils";
import {HTMLAttributes, forwardRef} from "react";

interface TableCardProps extends HTMLAttributes<HTMLDivElement> {
}

export const TableCard = forwardRef<HTMLDivElement,TableCardProps>(({className,...props},ref)=>{
    return <div {...props} ref={ref} className={cn("rounded-xl bg-card border-x-[6px] border-x-card text-card-foreground py-6 space-y-5 box-border",className)}>
        <div>
            kontol
        </div>
    </div>
})