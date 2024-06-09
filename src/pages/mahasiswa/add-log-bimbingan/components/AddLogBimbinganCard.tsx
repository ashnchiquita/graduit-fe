import { CardDescription, CardTitle } from "@/components/Card";
import { BimbinganDateButton } from "./BimbinganDateButton";
import { AddBerkas } from "./AddBerkas";
import { UseFormReturn } from "react-hook-form";
import { AddLogBimbinganFormData } from "../constants";
import { LaporanKemajuanComponent } from "./LaporanKemajuanComponent";
import { TodoComponent } from "./TodoComponent";
import { NextBimbinganDateButton } from "./NextBimbinganDateButton";

export default function AddLogBimbinganCard({
  title,
  description,
  optional,
  type,
  form,
}: {
  title: string;
  description: string;
  optional: boolean;
  type: string;
  form: UseFormReturn<AddLogBimbinganFormData>;
}) {
  const renderComponent = () => {
    switch (type) {
      case "bimbingan_date":
        return <BimbinganDateButton form={form} />;
      case "next_bimbingan_date":
        return <NextBimbinganDateButton form={form} />;
      case "laporan_kemajuan":
        return (
          <div className="mt-6">
            <LaporanKemajuanComponent form={form} />
          </div>
        );
      case "todo":
        return (
          <div className="mt-6">
            <TodoComponent form={form} />
          </div>
        );
      case "berkas":
        return <AddBerkas form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-1 rounded-lg bg-white px-4 py-3">
      {optional ? (
        <CardTitle> {title} </CardTitle>
      ) : (
        <CardTitle>
          {title}
          <span className="text-red-500"> *</span>
        </CardTitle>
      )}
      {optional ? (
        <CardDescription className="">
          {" "}
          {description}{" "}
          <span className="font-bold"> Bagian ini bersifat opsional </span>{" "}
        </CardDescription>
      ) : (
        <CardDescription> {description} </CardDescription>
      )}
      <div className="mt-[-12px]">{renderComponent()}</div>
    </div>
  );
}
