import Image from "next/image";
import React from "react";

interface inputProps {
  containerClass?: string;
  label?: string;
  labelClass?: string;
  inputGroupClass?: string;
  logoSrc?: string;
  inputType: string;
  placeholder: string;
  inputFieldClass?: string;
  errorMsg?: string;
  border: string;
  value?: string;
  error?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<inputProps> = ({
  containerClass,
  label,
  labelClass,
  inputGroupClass,
  logoSrc,
  inputType,
  placeholder,
  inputFieldClass,
  errorMsg,
  border,
  handleChange,
  value,
  required, error
}) => {
  return (
    <div className={`${containerClass}`}>
      <p className={`text-default text-xs mb-1 ${labelClass}`}>{label}</p>
      <div
        className={`flex items-center justify-between gap-2 border-${border} border p-2 rounded-[8px] ${inputGroupClass} focus-within:border-primary focus-within:shadow-custom-focus ${error ? "border-error" : "focus-within:border-primary"}`}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-4 h-3">
            <Image
              src={`/${logoSrc}`}
              alt={`logo`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <input
            type={`${inputType}`}
            required={required}
            placeholder={`${placeholder}`}
            className={`${inputFieldClass} w-[100%] focus:outline-none text-default px-2 text-sm`}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="text-error text-[10px] w-28 hidden lg:block">{error}</div>
      </div>
    </div>
  );
};

export default Input;
