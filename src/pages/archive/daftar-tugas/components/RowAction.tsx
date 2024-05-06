import { useNavigate } from "react-router-dom";

type RowActionProps = {
  url: string;
};

export default function RowAction({ url }: RowActionProps) {
  const navigate = useNavigate();
  return (
    <button
      className="rounded-md border border-blue-300 px-2 py-[3px] text-xs text-blue-500"
      type="button"
      onClick={() => navigate(url)}
    >
      Buka
    </button>
  );
}
