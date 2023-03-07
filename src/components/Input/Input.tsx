import { IInputProps } from "./Input.types";

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: IInputProps) => {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <label className="text-sm pl-5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-16 rounded-lg outline-none py-3 px-5 border-2 border-gray-300 placeholder:text-gray-400 shadow-md"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
