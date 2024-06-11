interface TagStatusType {
  status: string;
}

const TagStatus = ({ status }: TagStatusType) => {
  return (
    <>
      {status ? (
        <div
          className={`p-4 ${status === "lancar" ? "bg-green-500" : status === "butuh_bimbingan" ? "bg-yellow-500" : "bg-red-500"} rounded-md`}
        >
          <ul className="ml-2 list-disc text-xs font-semibold">
            <li
              className={`${status === "lancar" ? "text-green-700" : status === "butuh_bimbingan" ? "text-yellow-700" : "text-red-700"} `}
            >
              <span className=" text-white">
                {status === "lancar"
                  ? "Status bimbingan Anda lancar"
                  : status === "butuh_bimbingan"
                    ? "Status bimbingan Anda cukup baik, segera lakukan bimbingan"
                    : "Segera laksanakan bimbingan"}
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TagStatus;
