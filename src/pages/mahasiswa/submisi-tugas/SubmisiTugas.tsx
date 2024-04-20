import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form/form";
import { FormHeaderCard } from "./components/FormHeaderCard";
import useSubmisiTugasImpl from "./hooks/useSubmisiTugasImpl";
import { TugasDetailData } from "./types";
import { JawabanCard } from "./components/JawabanCard";
import { BerkasCard } from "./components/BerkasCard";

const Registration = () => {
  const { form, onSubmit, onSave } = useSubmisiTugasImpl();

  return (
    <div className="flex-1">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 px-4"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormHeaderCard {...TugasDetailData} />
          <JawabanCard form={form} />
          <BerkasCard form={form} />

          <div className="flex flex-col gap-8 p-6">
            <div className="text-gray-600">
              Mohon periksa kembali seluruh bagian sebelum mengirimkan formulir.
            </div>
            <div className="flex justify-between">
              <Button
                className="bg-blue-500 text-gray-100 hover:bg-blue-600"
                type="submit"
              >
                Kirim
              </Button>
              <Button
                className="border border-gray-400 bg-transparent text-gray-600 hover:bg-gray-100"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSave(form.getValues());
                }}
              >
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Registration;
