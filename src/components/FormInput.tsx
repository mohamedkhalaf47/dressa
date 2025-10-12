import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  multiline?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  multiline = false,
  rows = 4,
  options,
}) => {
  const baseInputStyles =
    'w-full px-4 py-3 border-2 rounded-xl font-poppins transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:border-transparent';
  const errorStyles = error ? 'border-rose-gold' : 'border-gray-300';

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-charcoal font-poppins font-medium mb-2">
        {label}
        {required && <span className="text-rose-gold ml-1">*</span>}
      </label>

      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseInputStyles} ${errorStyles}`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseInputStyles} ${errorStyles} resize-none`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseInputStyles} ${errorStyles}`}
        />
      )}

      {error && <p className="mt-1 text-sm text-rose-gold font-poppins">{error}</p>}
    </div>
  );
};
