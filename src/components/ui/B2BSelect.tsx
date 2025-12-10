import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface B2BSelectProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

/**
 * Premium Custom Select for B2B Form
 * 
 * Features:
 * - Smooth open/close animation
 * - FreshBox brand styling (green-cream colors)
 * - Keyboard navigation
 * - Click outside to close
 * - Accessible (ARIA attributes)
 */
const B2BSelect: React.FC<B2BSelectProps> = ({
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Выберите...',
  disabled = false,
  error = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Get selected option label
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onBlur]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onBlur]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    if (onBlur) onBlur();
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* Select Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          flex items-center justify-between w-full rounded-full px-5 py-3.5 text-base font-medium
          transition-all duration-150 shadow-sm hover:shadow-md
          ${error 
            ? 'border-2 border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/30' 
            : 'border-2 border-[#D9F99D] bg-[#FCFFF7] focus:bg-white focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-light/30'
          }
          ${!selectedOption ? 'text-brand-text-soft/60' : 'text-brand-text'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          outline-none
        `}
      >
        <span className="truncate">{displayText}</span>
        
        {/* Chevron Icon */}
        <ChevronDown 
          size={18} 
          strokeWidth={2.5} 
          className={`
            flex-shrink-0 ml-2 text-brand-text-soft/70 transition-transform duration-200
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        role="listbox"
        aria-label="Опции"
        className={`
          absolute left-0 right-0 mt-2 rounded-2xl border-2 border-[#D9F99D] bg-white shadow-xl z-50
          max-h-64 overflow-y-auto
          transform transition-all duration-150 ease-out origin-top
          ${isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
          }
        `}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#D9F99D #f0f0f0'
        }}
      >
        <ul className="py-2">
          {options.map((option) => {
            const isSelected = option.value === value;
            
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`
                  px-5 py-2.5 text-sm md:text-base cursor-pointer
                  transition-colors duration-150
                  flex items-center justify-between
                  ${isSelected 
                    ? 'bg-[#F0FDF4] text-brand-accent font-bold' 
                    : 'text-brand-text hover:bg-[#F0FDF4] hover:text-brand-accent'
                  }
                `}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check size={16} strokeWidth={2.5} className="text-brand-accent flex-shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default B2BSelect;

