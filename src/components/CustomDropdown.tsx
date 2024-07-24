import React, { useState } from "react";
import { IconType } from "react-icons";

interface PlatformOption {
  display: string;
  value: string;
  icon: IconType;
}

interface CustomDropdownProps {
  options: PlatformOption[];
  value?: PlatformOption;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    PlatformOption | undefined
  >(value);

  const handleSelect = (option: PlatformOption) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="w-full p-2 border border-gray-300 rounded-md flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <div className="flex items-center">
            {React.createElement(selectedOption.icon, {
              className: "w-6 h-6 mr-2",
            })}
            {selectedOption.display}
          </div>
        ) : (
          "Select platform"
        )}
        <span className="ml-2">&#9662;</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
          {options.map((option) => (
            <div key={option.value} className="p-2">
              <div
                className="p-2 cursor-pointer flex items-center hover:bg-gray-100 "
                onClick={() => handleSelect(option)}
              >
                {React.createElement(option.icon, {
                  className: "w-6 h-6 mr-2",
                })}
                {option.display}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
