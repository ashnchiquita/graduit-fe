import React from "react";

interface LetteredAvatarProps {
  name: string;
  className?: string;
  size?: number; // Size in pixels
}

const LetteredAvatar: React.FC<LetteredAvatarProps> = ({
  name,
  className,
  size = 8,
}) => {
  const getInitials = (name: string) => {
    if (!name) {
      return "";
    }
    const parts = name.split(" ");
    let initials = parts[0][0];
    if (parts.length > 1) {
      initials += parts[parts.length - 1][0];
    }
    return initials.toUpperCase();
  };

  // Calculate size in rem for both width and height
  const sizeInRem = `${size * 0.25}rem`;
  const fontSize = `${size * 0.1}rem`;

  // Apply dynamic styles for maintaining the circle shape and adjusting font size
  const avatarStyle = {
    width: sizeInRem,
    height: sizeInRem,
    lineHeight: sizeInRem,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontSize: fontSize,
  };

  return (
    <div
      className={`flex aspect-square items-center justify-center bg-blue-800 text-white ${className}`}
      style={avatarStyle}
    >
      {getInitials(name)}
    </div>
  );
};

export default LetteredAvatar;
