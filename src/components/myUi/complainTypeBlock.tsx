import React from "react";
import { IconType } from "react-icons";

interface ComplainBlockProps {
  icon: IconType;
  heading: string;
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const ComplainBlock: React.FC<ComplainBlockProps> = ({
  icon: Icon,
  heading,
  value,
  selectedValue,
  onSelect,
}) => {
  const isSelected = selectedValue === value;

  return (
    <div
      className={`flex items-center aspect-square p-6 border-2 rounded-xl cursor-pointer 
      transition-all duration-300 ease-in-out w-[220px] hover:shadow-xl hover:scale-105 
      m-4 group relative ${
        isSelected
          ? "border-gray-300 bg-gray-50"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => onSelect(value)}
    >
      <div className="flex flex-col items-center justify-center gap-6 flex-1">
        <div
          className={`text-5xl transition-all duration-300 transform group-hover:scale-110 
          ${
            isSelected
              ? "text-greenish"
              : "text-gray-600 group-hover:text-greenish"
          }`}
        >
          <Icon />
        </div>
        <h3
          className={`text-lg font-semibold text-center transition-colors duration-300
          ${
            isSelected
              ? "text-gray-900"
              : "text-gray-800 group-hover:text-gray-900"
          }`}
        >
          {heading}
        </h3>
        <input
          type="radio"
          checked={isSelected}
          onChange={() => onSelect(value)}
          className="w-6 h-6 accent-greenish transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  );
};

export default ComplainBlock;
