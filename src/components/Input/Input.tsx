import { IInputProps } from './Input.types';

const Input = ({ label, type, placeholder, value, onChange, error }: IInputProps) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-14 rounded-lg border-2 border-green-200 py-2 px-4 outline-none placeholder:text-gray-400"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
