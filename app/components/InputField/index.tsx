import React from 'react';
import Image from 'next/image';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onToggleVisibility?: () => void;
  showPassword?: boolean;
  id?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder = '', 
  value,
  onChange,
  className = '',
  onToggleVisibility,
  showPassword = false, 
  required = false,
  pattern,
  title,
  id,
  disabled = false
}) => (
  <div className={`w-full lg:mb-6 mb-3 ${className}`}>
    <label>{label}</label>
    <div className="relative">
      <input
        type={showPassword ? 'text' : type} 
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
       className="w-full p-3 border border-gray-300 rounded-1 h-full"
        required={required}
        pattern={pattern}
        title={title}
        disabled={disabled}
      />
      {onToggleVisibility && (
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-0 pt-[14px] pe-[14px] transform active:outline-none"
        >
          <Image
            src={showPassword ? "/eye-password-hide-svgrepo-com.svg" : "/eye.svg"}
            alt={showPassword ? "Hide password" : "Show password"}
            height={16}
            width={16}
          />
        </button>
      )}

    </div>
  </div>
);

export default InputField;
