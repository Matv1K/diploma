"use client";

import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";

interface SelectProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true); // Automatically open the dropdown when typing
  };

  return (
    <div className={styles.selectContainer}>
      <input
        className={styles.selectInput}
        type="text"
        placeholder={placeholder || "Select an option"}
        value={searchTerm}
        onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown
        onChange={handleInputChange} // Search while typing
      />

      {isOpen && (
        <div className={styles.optionsList}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                className={`${styles.option} ${
                  option === value ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className={styles.noOptions}>No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
