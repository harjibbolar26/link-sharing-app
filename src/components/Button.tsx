import React from "react";

interface buttonProps {
  bgColor: string;
  value?: string;
  width?: string | number;
  radius: string | number;
  textColor: string;
  hover: string;
  otheClasses?: string | number;
  children?: React.ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<buttonProps> = ({
  bgColor,
  value,
  width,
  radius,
  textColor,
  otheClasses,
  hover,
  children,
  disabled,
  handleClick,
  type,
}) => {
  return (
    <button
      className={`bg-${bgColor} w-${width} rounded-${radius} text-${textColor} ${otheClasses} hover:${hover}`}
      disabled={disabled}
      onClick={handleClick}
      type={type}
    >
      {value || children}
    </button>
  );
};

export default Button;
