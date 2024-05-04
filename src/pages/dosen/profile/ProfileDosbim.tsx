import { CardTitle } from "@/components/Card";
import { Form } from "@/components/ui/form/form";
import useSession from "@/hooks/useSession";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import EmailIcon from "../../../assets/profile-dosbim/email_icon.svg";
import GmailIcon from "../../../assets/profile-dosbim/gmail_icon.svg";
import MsTeamsIcon from "../../../assets/profile-dosbim/ms_teams_icon.svg";
import NameIcon from "../../../assets/profile-dosbim/name_icon.svg";
import TelpIcon from "../../../assets/profile-dosbim/telp_icon.svg";
import WhatsAppIcon from "../../../assets/profile-dosbim/whatsapp_icon.svg";
import InputWithIcon from "./components/InputWithIcon";
import useProfileDosbim from "./hooks/useProfileDosbim";

export default function ProfileDosbim() {
  const { form, onSubmit } = useProfileDosbim();
  const dataDosbim = useSession().data;
  const [isNotEditing, setIsNotEditing] = useState<boolean>(true);

  return (
    <main className="mx-7">
      <Form {...form}>
        <form onSubmit={form?.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 rounded-lg bg-white p-8">
            <div className="flex gap-5">
              <MdKeyboardArrowLeft className="text-3xl font-thin" />
              <CardTitle>Detail Akun</CardTitle>
            </div>
            <div className="px-[50px] py-8">
              <div className="flex flex-col gap-5">
                <InputWithIcon
                  form={form}
                  title="Email"
                  src={EmailIcon}
                  readOnly={true}
                  value={dataDosbim?.email || ""}
                  isForm={false}
                />
                <InputWithIcon
                  form={form}
                  title="Nama"
                  src={NameIcon}
                  readOnly={true}
                  value={dataDosbim?.nama || ""}
                  isForm={false}
                />
              </div>
            </div>
            <div className="px-[50px] py-8">
              <div className="flex flex-col gap-5">
                <div className="flex">
                  <CardTitle className="mb-2">Contact</CardTitle>
                  {isNotEditing ? (
                    <button
                      className="ml-auto rounded-md bg-blue-500 px-[60px] py-1 font-light text-white hover:bg-blue-600"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsNotEditing(false);
                      }}
                    >
                      Ubah
                    </button>
                  ) : (
                    <button
                      className="ml-auto rounded-md bg-blue-500 px-[60px] py-1 font-light text-white hover:bg-blue-600"
                      onClick={() => setIsNotEditing(true)}
                      type="submit"
                    >
                      Simpan
                    </button>
                  )}
                </div>
                <InputWithIcon
                  form={form}
                  title="WhatsApp"
                  src={WhatsAppIcon}
                  readOnly={isNotEditing}
                  isForm={true}
                  name="whatsapp"
                />
                <InputWithIcon
                  form={form}
                  title="Ms Teams"
                  src={MsTeamsIcon}
                  readOnly={isNotEditing}
                  isForm={true}
                  name="msteams"
                />
                <InputWithIcon
                  form={form}
                  title="Email"
                  src={GmailIcon}
                  readOnly={isNotEditing}
                  isForm={true}
                  name="email"
                />
                <InputWithIcon
                  form={form}
                  title="Telp"
                  src={TelpIcon}
                  readOnly={isNotEditing}
                  isForm={true}
                  name="telp"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
