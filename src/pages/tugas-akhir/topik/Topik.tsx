import { useNavigate, useParams } from "react-router-dom";
import TopicCard from "./components/TopikCard";

export default function TopicAllocation() {
  const data = [
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
    {
      lectId: 1,
      imgUrl:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
      lecturer: "Adi Mulyanto",
      topic: "Pengembangan Perangkat Lunak Skala Besar",
      description: "yaa.. bangun perangkat lunak lah intinya..",
    },
  ];

  const navigate = useNavigate();
  const params = useParams();

  const tambahTopik = () => {
    navigate(`/form-pendaftaran-topic`);
  };

  let count = 1;

  return (
    <>
      <main className="flex min-h-full min-w-full flex-col p-5">
        <h2 className="pb-7 text-3xl font-bold">Topik Tugas Akhir</h2>
        <section className="flex flex-col">
          <div
            className={`flex flex-row ${params.role === "gap-2" ? "gap-3" : "gap-5"} pb-4`}
          >
            <input
              style={{ minWidth: params.role === "2" ? "88%" : "92%" }}
              className={`min-h-full rounded-lg border border-solid border-gray-500 p-2`}
              type="text"
              placeholder="Masukkan topik atau nama dosen"
            />
            <button
              style={{ minWidth: params.role === "2" ? "5%" : "7%" }}
              className={`rounded-lg bg-black text-white`}
            >
              Cari
            </button>
            {params.role === "2" && (
              <button
                onClick={tambahTopik}
                className="min-w-[5%] rounded-lg border-2 border-solid border-blue-400 bg-white font-bold text-blue-400"
              >
                + Add
              </button>
            )}
          </div>
          <div className="flex flex-col gap-5 text-center">
            {data &&
              count > 0 &&
              data.map((data) => {
                count++;
                if (count <= 11) {
                  return (
                    <TopicCard
                      key={count}
                      lectId={data.lectId}
                      imgUrl={data.imgUrl}
                      lecturer={data.lecturer}
                      topic={data.topic}
                      description={data.description}
                      isStudent={params?.role || "2"}
                    />
                  );
                } else {
                  return null;
                }
              })}
            {data.length === 0 && <p>Tidak ada alokasi dosen dan topik</p>}
          </div>
        </section>
      </main>
    </>
  );
}
