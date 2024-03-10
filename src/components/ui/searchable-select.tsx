import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import SelectData from "@/types/select-data";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import * as React from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

interface SearchableSelectProps {
  dataOptions: SelectData[];
  selected: string | null;
  setSelected: (selected: string) => void;
  inputValue: string;
  setInputValue: (input: string) => void;
  className?: string;
  optionClassName?: string;
  disabled?: boolean;
  selectablePosition?: string;
  setEditing?: (editing: boolean) => void;
  placeholder?: string;
  shouldFilter?: boolean;
}

export function SearchableSelect({
  dataOptions,
  selected,
  setSelected,
  inputValue,
  setInputValue,
  className,
  optionClassName,
  disabled = false,
  selectablePosition = "top-0",
  placeholder = "Select...",
  setEditing = () => {},
  shouldFilter = false,
}: SearchableSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const observer = React.useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting)
            entry.target.scrollIntoView({ behavior: "smooth" });
        },
        { threshold: 1.0 },
      ),
    [],
  );

  const lastItemRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (node !== null) {
        observer.observe(node);
      }
    },
    [observer],
  );

  React.useEffect(() => {
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setOpen(false);
    setInputValue(selected ?? "");
    inputRef.current?.blur();
  }, [selected, setInputValue]);

  return (
    <Command
      className="overflow-visible bg-transparent"
      shouldFilter={shouldFilter}
    >
      <div
        className={cn(
          `group rounded-md border border-gray-300 px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
      >
        <div
          className="flex cursor-pointer flex-wrap items-center gap-1"
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <Search className="mr-2 size-4 shrink-0 opacity-50" />
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={(value) => {
              setInputValue(value);
              setEditing(true);
            }}
            onBlur={() => {
              setOpen(false);
              setInputValue(selected ?? "");
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            disabled={disabled}
          />
          {open ? <VscChevronUp /> : <VscChevronDown />}
        </div>
      </div>
      <div className="relative mt-2">
        {open && dataOptions.length > 0 && !disabled ? (
          <div
            className={`absolute ${selectablePosition} z-10 w-full rounded-md border border-gray-100 bg-[#FFFFFF] text-popover-foreground shadow-md outline-none animate-in ${optionClassName}`}
          >
            <CommandGroup className="h-full overflow-auto">
              {dataOptions.map((data, idx) => {
                return (
                  <CommandItem
                    ref={
                      idx === dataOptions.length - 1 ? lastItemRef : undefined
                    }
                    key={data.value}
                    onMouseDown={(e: {
                      preventDefault: () => void;
                      stopPropagation: () => void;
                    }) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setSelected(data.value);
                      setInputValue(data.label);
                      setEditing(true);
                      setOpen(false);
                    }}
                    className={"cursor-pointer text-base"}
                    disabled={disabled}
                  >
                    {data.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
