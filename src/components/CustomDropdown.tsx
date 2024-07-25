import React, { useState } from "react";
import { IconType } from "react-icons";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

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
        className="w-full p-2 border border-border rounded-md flex items-center justify-between focus:border-primary"
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
        {isOpen ? (
          <span className="ml-2 text-primary">
            <MdKeyboardArrowUp size={25} />
          </span>
        ) : (
          <span className="ml-2 text-primary">
            <MdKeyboardArrowDown size={25} />
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-border rounded-md mt-1">
          {options.map((option) => (
            <div key={option.value} className="p-2">
              <div
                className="p-2 cursor-pointer flex items-center hover:text-primary"
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
