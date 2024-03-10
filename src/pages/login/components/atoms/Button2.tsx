import "../../styles/Button2.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  fade?: string;
  className?: string;
}

export default function Button2(props: ButtonProps) {
  const { text, onClick, fade, className = "" } = props;

  return (
    <button
      className={`button button-text primary2 text-detail w-full ${className}`}
      onClick={onClick}
      type="button"
      data-aos={fade}
      tabIndex={0}
    >
      <img src="/icon/sso.png" alt="SSO Icon" className="icon" />
      {text}
    </button>
  );
}
