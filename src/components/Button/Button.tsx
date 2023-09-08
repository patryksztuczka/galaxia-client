import { IButtonProps } from './Button.types';
import Spinner from '../Spinner/Spinner';

const Button = ({ type, text, isLoading, onClick }: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="h-14 w-full rounded-lg bg-green-500 font-semibold tracking-wide text-white hover:bg-green-600"
    >
      {!isLoading ? text : <Spinner />}
    </button>
  );
};

export default Button;
