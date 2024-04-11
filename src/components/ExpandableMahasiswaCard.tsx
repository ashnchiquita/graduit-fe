import { FaArrowLeft } from "react-icons/fa6";
import type { User } from "@/lib/entity";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";
import { Lightbulb, WrapText } from "lucide-react";

type ExpandableMahasiswaCardProps = {
  user: User & { submissionTime: Date };
  backArrow: boolean;
  topik: string;
  deskripsi: string;
};

const ExpandableMahasiswaCard = ({
  user,
  backArrow,
  topik,
  deskripsi,
}: ExpandableMahasiswaCardProps) => {
  const DATETIME_FORMAT = "DD/MM/YYYY HH.mm";

  const navigate = useNavigate();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-2xl bg-white p-6 text-base md:px-10 md:py-8"
    >
      <AccordionItem className="border-0" value="header">
        <AccordionTrigger className="py-0 text-left hover:no-underline">
          <div className="flex items-center gap-4 md:gap-6">
            {backArrow && (
              <Button
                variant="ghost"
                size="icon"
                className="w-fit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
              >
                <FaArrowLeft className="size-4 text-gray-500 md:size-6" />
              </Button>
            )}
            <Avatar className="size-12">
              <AvatarFallback className="bg-violet-500 text-xl text-white">
                {user.name.length > 0 && user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-center gap-3">
                <div className="font-medium">{user.name}</div>
                <div className="hidden text-xs text-muted-foreground md:block">
                  {dayjs(user.submissionTime).format(DATETIME_FORMAT)}
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden gap-2 text-xs font-normal text-muted-foreground md:flex">
                <div>{user.email}</div>
                <div>•</div>
                <div>{user.major}</div>
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-1 text-xs text-muted-foreground md:hidden">
                <div className="font-medium">{user.major}</div>
                <div>{user.email}</div>
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="py-0">
          <div className="mt-8 flex flex-1 flex-col justify-between overflow-hidden">
            <div className="flex flex-1 flex-col space-y-5 overflow-hidden">
              <div className="space-y-1">
                <div className="flex w-full items-center gap-3">
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-yellow-200">
                      <Lightbulb className="size-4 text-yellow-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-base text-muted-foreground">Topik</div>
                </div>
                <div className="pl-9 text-sm md:text-base">{topik}</div>
              </div>

              <div className="flex flex-col space-y-1 overflow-hidden">
                <div className="flex w-full items-center gap-3">
                  <Avatar className="size-6">
                    <AvatarFallback className="bg-pink-200">
                      <WrapText className="size-4 text-pink-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-base text-muted-foreground">
                    Deskripsi
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="pl-9 text-sm md:text-base">{deskripsi}</div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExpandableMahasiswaCard;
