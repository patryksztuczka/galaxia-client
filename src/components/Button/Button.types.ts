export interface IButtonProps {
  type: "submit" | "button" | "reset";
  text: string;
  isLoading?: boolean;
  onClick?: () => void;
}
