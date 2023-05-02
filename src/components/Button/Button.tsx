import { IButtonProps } from './Button.types';
import Spinner from '../Spinner/Spinner';

const Button = ({ type, text, isLoading, onClick }: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="h-16 w-full rounded-lg bg-red-500 font-medium tracking-wide text-white shadow-md hover:bg-red-600"
    >
      {!isLoading ? text : <Spinner />}
    </button>
  );
};

export default Button;
