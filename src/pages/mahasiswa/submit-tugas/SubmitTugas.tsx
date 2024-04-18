import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form/form";
import { FormHeaderCard } from "./components/FormHeaderCard/FormHeaderCard";
import { TugasDetailData } from "./components/FormHeaderCard/types";

const Registration = () => {
  // const { form, onSubmit } = useThesisRegistrationImpl();

  return (
    <div className="flex-1">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 px-4"
          // onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormHeaderCard {...TugasDetailData} />
          {/* <LecturerCard form={form} />
          <StreamCard form={form} /> */}

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
                className="text-blue-500 hover:text-blue-600"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
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
