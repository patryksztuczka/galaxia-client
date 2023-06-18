import { IInputProps } from './Input.types';

const Input = ({ label, type, placeholder, value, onChange, error }: IInputProps) => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      {label && <label className="pl-5 text-sm">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-16 rounded-lg border-2 border-gray-300 py-3 px-5 shadow-md outline-none placeholder:text-gray-400"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
