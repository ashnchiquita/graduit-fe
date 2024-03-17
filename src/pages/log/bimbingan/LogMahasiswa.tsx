import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { VscListFilter, VscAdd } from "react-icons/vsc";
import { CardTable, TableHeader, TableRowProps } from "./components/Table";

const dummyData: TableRowProps[] = [
  {
    tanggal: <p>11/02/2023</p>,
    laporanKemajuan: (
      <p>
        Sudah mengerjakan bab 1-3 untuk propsan. Mionggu depan sudah bisa
        seminar
      </p>
    ),
    todo: (
      <>
        <p>Berikut hal yang saya akan lakukan</p>
        <ul>
          <li>Berjalan-jalan di taman</li>
          <li>Menontori spongebob</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          numquam dignissimos porro expedita exercitationem. Pariatur repellat
          aspernatur ex, veritatis perspiciatis, et in aliquid facere minima
          corporis blanditiis dolore repudiandae dolores?
        </p>
      </>
    ),
    berkas: {
      nama: "Laporan #1",
      url: "https://www.google.com",
    },
    status: "Tidak Sah",
    rencana: <p>11/03/20224</p>,
  },
  {
    tanggal: <p>11/02/2023</p>,
    laporanKemajuan: (
      <p>
        Sudah mengerjakan bab 1-3 untuk propsan. Mionggu depan sudah bisa
        seminar
      </p>
    ),
    todo: (
      <>
        <p>Berikut hal yang saya akan lakukan</p>
        <ul>
          <li>Berjalan-jalan di taman</li>
          <li>Menontori spongebob</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          numquam dignissimos porro expedita exercitationem. Pariatur repellat
          aspernatur ex, veritatis perspiciatis, et in aliquid facere minima
          corporis blanditiis dolore repudiandae dolores?
        </p>
      </>
    ),
    berkas: {
      nama: "Laporan #1",
      url: "https://www.google.com",
    },
    status: "Tidak Sah",
    rencana: <p>11/03/20224</p>,
  },
  {
    tanggal: <p>11/02/2023</p>,
    laporanKemajuan: (
      <p>
        Sudah mengerjakan bab 1-3 untuk propsan. Mionggu depan sudah bisa
        seminar
      </p>
    ),
    todo: (
      <>
        <p>Berikut hal yang saya akan lakukan</p>
        <ul>
          <li>Berjalan-jalan di taman</li>
          <li>Menontori spongebob</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          numquam dignissimos porro expedita exercitationem. Pariatur repellat
          aspernatur ex, veritatis perspiciatis, et in aliquid facere minima
          corporis blanditiis dolore repudiandae dolores?
        </p>
      </>
    ),
    berkas: {
      nama: "Laporan #1",
      url: "https://www.google.com",
    },
    status: "Tidak Sah",
    rencana: <p>11/03/20224</p>,
  },
  {
    tanggal: <p>11/02/2023</p>,
    laporanKemajuan: (
      <p>
        Sudah mengerjakan bab 1-3 untuk propsan. Mionggu depan sudah bisa
        seminar
      </p>
    ),
    todo: (
      <>
        <p>Berikut hal yang saya akan lakukan</p>
        <ul>
          <li>Berjalan-jalan di taman</li>
          <li>Menontori spongebob</li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          numquam dignissimos porro expedita exercitationem. Pariatur repellat
          aspernatur ex, veritatis perspiciatis, et in aliquid facere minima
          corporis blanditiis dolore repudiandae dolores?
        </p>
      </>
    ),
    berkas: {
      nama: "Laporan #1",
      url: "https://www.google.com",
    },
    status: "Tidak Sah",
    rencana: <p>11/03/20224</p>,
  },
];

export default function LogMahasiswa(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 px-4 pb-20">
      <ul className=" font-urbanist text-xs font-semibold text-green-500 list-disc ml-2">
        <li>Status bimbingan log bimbingan</li>
      </ul>
      <Card
        isTable={true}
        HeaderElement={
          <CardHeader className="w-full px-7">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <CardTitle>Log Bimbingan</CardTitle>
                <CardDescription>
                  Berikut merupakan log bimbingan
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant={"outline"} className="flex">
                  <VscListFilter className="text-muted-foreground" />
                  <p className="font-urbanist font-medium text-[12px] text-muted-foreground ml-2">
                    Filter
                  </p>
                </Button>
                <Button variant={"default"} className="bg-blue-500 flex">
                  <VscAdd />
                  <p className="ml-2 font-urbanist font-medium text-[12px]">
                    Isi Baru
                  </p>
                </Button>
              </div>
            </div>
          </CardHeader>
        }
        ContentElement={
          <CardTable TableHeader={<TableHeader />} TableContent={dummyData} />
        }
        FooterElement={
          <>
            <div className="flex justify-between px-4"></div>
          </>
        }
      />
    </div>
  );
}
