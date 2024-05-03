"use client";
import { useState } from "react";
import type { Topic } from "@/lib/entity";
// import { useNavigate } from "react-router-dom";

export default function TopicCard(topic: Topic) {
  const [dropDown, setDropdown] = useState(false);
  // const navigate = useNavigate();

  // const daftar = (lectId: number) => {
  //   navigate(`/form-pendaftaran?id=${lectId}`);
  // };

  return (
    <>
      <div className="relative flex flex-row gap-8 rounded-2xl bg-white p-6 text-start shadow-md">
        <div className="flex items-center justify-center">
          <img
            src={topic.imgUrl}
            alt={"foto dosen " + topic.lecturer}
            className="size-28 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-bold">{topic.lecturer}</p>
          <p className="text-gray-700">{topic.topic}</p>
          <p className="text-sm text-gray-500">{topic.description}</p>
        </div>
        {topic.isStudent === "0" && (
          <button
            onClick={() => setDropdown(!dropDown)}
            className="absolute right-4 top-4 flex size-10 flex-col items-center justify-center rounded-full bg-transparent hover:bg-gray-200 focus:outline-none"
          >
            <span className="mb-1 block size-1 rounded-full bg-black"></span>
            <span className="mb-1 block size-1 rounded-full bg-black"></span>
            <span className="block size-1 rounded-full bg-black"></span>
          </button>
        )}
        {dropDown && (
          <div
            className="absolute right-10 top-10 h-[120px] w-40 rounded-lg border border-gray-500 p-2"
            // onClick={daftar(topic.lectId)}
          >
            <p>Daftar</p>
          </div>
        )}
      </div>
    </>
  );
}
