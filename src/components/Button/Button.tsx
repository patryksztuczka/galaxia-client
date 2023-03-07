import { IButtonProps } from "./Button.types";
import Spinner from "../Spinner/Spinner";

const Button = ({ type, text, isLoading, onClick }: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-red-500 h-16 w-full rounded-lg text-white font-medium hover:bg-red-600 shadow-md"
    >
      {!isLoading ? text : <Spinner />}
    </button>
  );
};

export default Button;
