export interface IInputProps {
  label?: string;
  type: 'text' | 'password' | 'number' | 'date' | 'time';
  placeholder: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
