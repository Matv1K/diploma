'use client';

import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';

interface SelectProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange: (_value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');

  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOptionClick = (option: string) => {
    onChange(option);

    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className={styles.selectContainer}>
      <input
        className={styles.selectInput}
        type='text'
        placeholder={placeholder || 'Select an option'}
        value={searchTerm}
        onClick={() => setIsOpen(!isOpen)}
        onChange={handleInputChange}
      />

      {isOpen && (
        <div className={styles.optionsList}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div
                key={option}
                className={`${styles.option} ${option === value ? styles.selected : ''}`}
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
