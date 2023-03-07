export interface IInputProps {
  label: string;
  type: "text" | "password" | "number";
  placeholder: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
