import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const AutocompleteInput = ({
  label,
  value = '',
  onChange,
  options = [],
  placeholder = '',
  name,
  error,
  className = '',
  maxSuggestions = 8,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  // Filter options based on input value
  const filteredOptions = value && value.trim() !== ''
    ? options
        .filter((option) =>
          option.toLowerCase().includes(value.toLowerCase().trim())
        )
        .slice(0, maxSuggestions)
    : options.slice(0, maxSuggestions);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (selectedOption) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: selectedOption,
        },
      });
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        e.preventDefault();
        handleSelectOption(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="relative block w-full">
      {label && (
        <span className="mb-2 block text-sm font-medium text-white/80">
          {label}
        </span>
      )}

      <div className="relative">
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={twMerge(
            'w-full rounded-full border border-white/15 bg-[#13022B] px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#FFD54A]/40 transition duration-200',
            error ? 'border-red-400' : '',
            className
          )}
          autoComplete="off"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-white/15 bg-[#140726]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          {filteredOptions.map((option, index) => {
            const isHighlighted = index === highlightedIndex;
            return (
              <div
                key={option}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={twMerge(
                  'cursor-pointer rounded-xl px-4 py-2.5 text-sm text-white/80 transition duration-150',
                  isHighlighted ? 'bg-[#2B0A5A] text-[#FFE7A3] font-medium' : 'hover:bg-white/10 hover:text-white'
                )}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </div>
  );
};

export default AutocompleteInput;
