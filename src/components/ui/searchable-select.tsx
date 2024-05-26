import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import SelectData from "@/types/select-data";
import { Command as CommandPrimitive } from "cmdk";
import { Plus, Search } from "lucide-react";
import * as React from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

interface SearchableSelectProps {
  dataOptions: SelectData[];
  suggestAddOption?: boolean;
  suggestAddOptionPrompt?: string;
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
  onNewOptionCreated?: (newOptionCreated: boolean) => void;
}

export function SearchableSelect({
  dataOptions,
  suggestAddOption,
  suggestAddOptionPrompt,
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
  onNewOptionCreated,
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
    // close when selected changes
    setOpen(false);
    if (!suggestAddOption || selected === "")
      setInputValue(
        dataOptions.find(({ value }) => value === selected)?.label ?? "",
      );
    inputRef.current?.blur();
  }, [selected, setInputValue, dataOptions, suggestAddOption]);

  return (
    <Command
      className="relative overflow-visible bg-transparent"
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
              const selectedOption = dataOptions.find(
                ({ value }) => value === selected,
              );

              if (suggestAddOption) {
                // setSelected(inputValue);
              } else {
                setInputValue(selectedOption?.label ?? "");
              }
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
        {open &&
        (dataOptions.length > 0 || (suggestAddOption && inputValue)) &&
        !disabled ? (
          <div
            className={`absolute ${selectablePosition} z-10 w-full rounded-md border border-gray-100 bg-[#FFFFFF] text-popover-foreground shadow-md outline-none animate-in ${optionClassName}`}
          >
            <CommandGroup className="h-full overflow-auto">
              {suggestAddOption &&
                inputValue &&
                !dataOptions.find(({ label }) => label === inputValue) && (
                  <CommandItem
                    ref={dataOptions.length === 0 ? lastItemRef : undefined}
                    key={"added-option"}
                    onMouseDown={(e: {
                      preventDefault: () => void;
                      stopPropagation: () => void;
                    }) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setSelected(inputValue);
                      setInputValue(inputValue);
                      setEditing(true);
                      setOpen(false);
                      if (onNewOptionCreated) {
                        onNewOptionCreated(true);
                      }
                    }}
                    className={"flex cursor-pointer gap-4 text-base"}
                    value={"added-option"}
                  >
                    <Plus size={10} className="text-blue-500" />
                    <div>
                      {suggestAddOptionPrompt
                        ? `${suggestAddOptionPrompt} '${inputValue}'`
                        : inputValue}
                    </div>
                  </CommandItem>
                )}
              {dataOptions.map((data, idx) => {
                return (
                  <CommandItem
                    ref={
                      idx === dataOptions.length - 1 ? lastItemRef : undefined
                    }
                    key={data.label}
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
                      if (onNewOptionCreated) {
                        onNewOptionCreated(false);
                      }
                    }}
                    className={"cursor-pointer text-base"}
                    value={data.label}
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
