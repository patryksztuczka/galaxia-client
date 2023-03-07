import { IAuthProviderButtonProps } from "./AuthProviderButton.types";

const AuthProviderButton = ({
  providerName,
  providerIcon,
  onClick,
}: IAuthProviderButtonProps) => {
  return (
    <div
      className="flex items-center gap-2 justify-center h-16 border-2 rounded-lg border-bg-zinc-200 cursor-pointer shadow-md"
      onClick={onClick}
    >
      <div className="flex h-6 w-6">{providerIcon}</div>
      <span className="font-bold text-xl">{providerName}</span>
    </div>
  );
};

export default AuthProviderButton;
