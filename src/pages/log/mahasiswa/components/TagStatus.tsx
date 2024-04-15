
interface TagStatusType {
  status: "SAH" | "MENUNGGU" | "TIDAKSAH";
}

const TagStatus = ({ status }: TagStatusType) => {
  return (
    <div
      className={`p-4 ${status == "SAH" ? "bg-green-500" : status == "MENUNGGU" ? "bg-yellow-500" : "bg-red-500"} rounded-md`}
    >
      <ul className=" font-urbanist text-xs font-semibold list-disc ml-2">
        <li
          className={`${status == "SAH" ? "text-green-700" : status == "MENUNGGU" ? "text-yellow-700" : "text-red-700"} `}
        >
          <span className=" text-white">
            {status == "SAH"
              ? "Status bimbingan Anda lancar"
              : status == "MENUNGGU"
                ? "Status bimbingan Anda cukup baik, segera lakukan bimbingan"
                : "Segera laksanakan bimbingan"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default TagStatus;
