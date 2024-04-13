import { CardDescription, CardTitle } from "@/components/Card";
// import { Textarea } from "@/components/ui/textarea";
import { PickDateButton } from "./PickDateButton";
import { AddBerkas } from "./AddBerkas";
import { UseFormReturn } from "react-hook-form";
import { AddLogBimbinganFormData } from "../constants";
import { TextAreaComponent } from "./TextAreaComponent";

export default function AddLogBimbinganCard({
  title,
  descriprion,
  optional,
  type,
  form,
}: {
  title: string;
  descriprion: string;
  optional: boolean;
  type: string;
  form: UseFormReturn<AddLogBimbinganFormData>;
}) {
  const renderComponent = () => {
    switch (type) {
      case "date":
        return <PickDateButton form={form} />;
      case "text":
        return <TextAreaComponent form={form} />;
      case "berkas":
        return <AddBerkas form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg bg-white px-4 py-3 flex flex-col gap-2">
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
          {descriprion}{" "}
          <span className="font-bold"> Bagian ini bersifat opsional </span>{" "}
        </CardDescription>
      ) : (
        <CardDescription> {descriprion} </CardDescription>
      )}
      <div>{renderComponent()}</div>
    </div>
  );
}
