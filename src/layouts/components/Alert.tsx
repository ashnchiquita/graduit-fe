import { useEffect, useState } from "react";

interface AlertProps {
  deadline: string; // deadline <DD-MM-YYYY HH:MM
}

export default function Alert({ deadline }: AlertProps): JSX.Element {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });

  useEffect(() => {
    const [date, time] = deadline.split(" ");
    const [day, month, year] = date.split("-");
    const [hours, minutes] = time.split(":");
    const deadlineDate = new Date(
      `${year}-${month}-${day}T${hours}:${minutes}:00`,
    );

    const interval = setInterval(() => {
      const now = new Date();
      const difference = deadlineDate.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        setTimeLeft({ days, hours });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <aside className={`relative-alert my-5 flex h-[100px] w-full py-3 pl-1`}>
      <nav className="relative-alert transparent z-10 w-full flex-row items-center justify-between rounded-lg px-4 py-10 ">
        <div className="flex w-full items-center gap-3 rounded bg-red-500 text-white">
          <h1 className="mx-3 px-5 font-['Urbanist'] text-lg font-normal">
            Important Notes !
          </h1>
        </div>
        <div className="flex h-[150px] w-full items-center gap-3 border bg-white shadow-md">
          <h1 className="mx-10 px-5 font-['Urbanist'] text-xl">
            Penginputan Dosen Pembimbing
          </h1>
          <div className="flex w-[200px] items-center gap-3">
            <div className="w-[50px] flex-row items-center gap-2 rounded-lg border text-center shadow-md">
              <p className="text-2xl">{timeLeft.days}</p>
              <p>Days</p>
            </div>
            <div className="w-[50px] flex-row items-center gap-2 rounded-lg border text-center shadow-md">
              <p className="text-2xl">{timeLeft.hours}</p>
              <p>Hours</p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

// contoh pemanggilannya
{
  /* <Alert deadline="07-03-2024 00:00" /> */
}
