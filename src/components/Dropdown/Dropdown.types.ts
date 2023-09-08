export interface IDropdownProps {
  label: string;
  placeholder: string;
  data: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
