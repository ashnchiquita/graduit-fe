import { CardDescription, CardTitle } from "@/components/Card";
import { Textarea } from "@/components/ui/textarea";
import { PickDateButton } from "./PickDateButton";
import { AddBerkas } from "./AddBerkas";

export default function AddLogBimbinganCard({
  title,
  descriprion,
  optional,
  type,
}: {
  title: string;
  descriprion: string;
  optional: boolean;
  type: string;
}) {
  const renderComponent = () => {
    switch (type) {
      case "date":
        return <PickDateButton />;
      case "text":
        return <Textarea />;
      case "berkas":
        return <AddBerkas />;
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
