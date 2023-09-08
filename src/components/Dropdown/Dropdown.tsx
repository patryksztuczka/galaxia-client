import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { IDropdownProps } from './Dropdown.types';
import ChevronIcon from '../../assets/icons/ChevronIcon';

const Dropdown: FC<IDropdownProps> = ({ data, label, onChange, placeholder, value, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeValue = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div
        className="relative flex h-14 items-center rounded-lg border-2 border-green-200 py-2 px-4"
        onClick={toggleList}
      >
        <div
          className={clsx('flex w-full items-center justify-between', !value && 'text-gray-400')}
        >
          <span>{value ? <span className="capitalize">value</span> : placeholder}</span>
          <div className={clsx('duration-150', isOpen ? 'rotate-180' : 'rotate-0')}>
            <ChevronIcon />
          </div>
        </div>
        {isOpen ? (
          <div className="absolute top-14 left-0 w-full rounded-lg border-2 border-green-200 bg-white">
            {data.map((item) => (
              <div
                key={item}
                className="px-4 py-1 font-medium capitalize"
                onClick={() => handleChangeValue(item)}
              >
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Dropdown;
