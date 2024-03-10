import "../../styles/Button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  fade?: string;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { text, onClick, fade, className = "" } = props;

  return (
    <button
      className={`button button-text primary text-detail w-full ${className}`}
      type="submit"
      onClick={onClick}
      data-aos={fade}
      tabIndex={0}
    >
      {text}
    </button>
  );
}
