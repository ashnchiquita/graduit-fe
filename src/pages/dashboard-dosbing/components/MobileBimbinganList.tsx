import { Search } from "lucide-react";
import { MahasiswaBimbingan, StatusBimbingan } from "../types";
import { Button } from "@/components/ui/button";
import { VscChevronRight, VscListFilter } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import StatusBadge from "./StatusBadge";

interface MobileBimbinganListProps {
  data: MahasiswaBimbingan[];
  searchPlaceholder: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function MobileBimbinganList({
  data,
  searchPlaceholder,
  searchValue,
  setSearchValue,
}: MobileBimbinganListProps): JSX.Element {
  const tabs = [
    {
      name: "Semua",
      onClick: () => {
        setActiveTab(tabs[0]);
      },
    },
    {
      name: "Sarjana",
      onClick: () => {
        setActiveTab(tabs[1]);
      },
    },
    {
      name: "Magister",
      onClick: () => {
        setActiveTab(tabs[2]);
      },
    },
  ];

  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [highlightStyle, setHighlightStyle] = useState({});

  // Function to update the highlight style
  const updateHighlightStyle = (tabName: string) => {
    if (tabsRef.current) {
      const tabElement = tabsRef.current.querySelector(
        `[data-tab="${tabName}"]`,
      ) as HTMLElement;
      if (tabElement) {
        const { offsetLeft, offsetWidth } = tabElement;
        setHighlightStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  };

  // Update the highlight style whenever the activeTab changes
  useEffect(() => {
    if (activeTab) updateHighlightStyle(activeTab.name);
  }, [activeTab]);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4">
      <div className="flex w-full items-center gap-2 rounded-md border border-input bg-transparent px-2 py-1 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
        <Search size={14} className="text-muted-foreground" />
        <input
          type="text"
          className="outline-none"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full gap-2">
        <Button
          onClick={() => {}}
          variant="outline"
          className="flex h-fit w-full gap-2 bg-transparent p-2"
        >
          <VscListFilter size={14} />
          <p>Filter</p>
        </Button>
        <Button
          onClick={() => {}}
          variant="outline"
          className="flex h-fit w-full gap-2 bg-transparent p-2"
        >
          <VscListFilter size={14} />
          <p>Sort</p>
        </Button>
      </div>
      <div className="flex w-full items-center justify-between">
        <div
          ref={tabsRef}
          className="relative flex w-full items-center justify-between border-b border-b-gray-300"
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              data-tab={tab.name}
              onClick={() => {
                tab.onClick();
              }}
              className={clsx(
                "relative z-10 flex items-center gap-1 px-3 py-2 text-[#0D0D0D] transition-all duration-200 ease-in-out hover:text-blue-500",
                activeTab.name === tab.name ? "text-blue-500" : "",
              )}
            >
              <p className="font-medium">{tab.name}</p>
            </button>
          ))}
          <div
            className="absolute bottom-[-1.25px] h-0.5 rounded bg-blue-500 transition-all duration-300"
            style={highlightStyle}
          ></div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        {data.map((mahasiswa) => (
          <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-100 p-4">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-800">
                  {mahasiswa.nama}
                </p>
                <p className="text-xs text-gray-500">{mahasiswa.nim}</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status={mahasiswa.status as StatusBimbingan} />
                <VscChevronRight size={14} />
              </div>
            </div>
            <p className="text-xs text-gray-800">{mahasiswa.topik}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
