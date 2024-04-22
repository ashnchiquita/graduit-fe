import { useFieldArray, UseFormReturn } from "react-hook-form";
import { SubmitTugasFormData } from "../types";
import { useState } from "react";

export default function useBerkas(form: UseFormReturn<SubmitTugasFormData>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "berkas",
  });

  const [isTambah, setIsTambah] = useState<boolean>(false);
  const [namaBerkas, setNamaBerkas] = useState("");
  const [linkBerkas, setLinkBerkas] = useState("");

  const changeIsTambah = () => {
    setIsTambah(!isTambah);
  };

  const addBerkasToArr = () => {
    if (namaBerkas === "" || linkBerkas === "") return;
    append({ nama: namaBerkas, url: linkBerkas });
    setNamaBerkas("");
    setLinkBerkas("");
    setIsTambah(false);
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return {
    fields,
    changeIsTambah,
    addBerkasToArr,
    handleRemove,
    setNamaBerkas,
    setLinkBerkas,
    isTambah,
    namaBerkas,
    linkBerkas,
    append,
  };
}
