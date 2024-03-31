type StatusMessageWrapperProps = {
  text: string;
  isSuccess: boolean;
};

const StatusMessageWrapper = ({
  text,
  isSuccess,
}: StatusMessageWrapperProps) => {
  return (
    <div
      className={`${isSuccess ? "border-green-300 bg-green-50 text-green-500" : "border-red-300 bg-red-50 text-red-500"} w-fit rounded-md border-[1px] px-2 py-1 text-center`}
    >
      {text}
    </div>
  );
};

export default StatusMessageWrapper;
