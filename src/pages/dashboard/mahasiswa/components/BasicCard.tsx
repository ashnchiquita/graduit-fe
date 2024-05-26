import React from "react";
import { twMerge } from "tailwind-merge";

type BasicCardProps = {
  title?: string;
  subtitle?: string;
  componentClass?: string;
  childClass?: string;
  children: React.ReactNode;
};

const BasicCard = ({
  title,
  subtitle,
  children,
  componentClass,
  childClass,
}: BasicCardProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col rounded-md bg-white p-5",
        componentClass,
      )}
    >
      {title && <h2 className="mb-4 text-xl font-medium">{title}</h2>}
      {subtitle && <h3 className="mb-2">{subtitle}</h3>}

      <div
        className={twMerge(
          "flex flex-col gap-4 text-sm text-gray-600",
          childClass,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default BasicCard;
