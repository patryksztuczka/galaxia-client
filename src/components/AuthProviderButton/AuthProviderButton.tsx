import { IAuthProviderButtonProps } from './AuthProviderButton.types';

const AuthProviderButton = ({ providerName, providerIcon, onClick }: IAuthProviderButtonProps) => {
  return (
    <div
      className="border-bg-zinc-200 flex h-14 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-green-200"
      onClick={onClick}
    >
      <div className="flex h-6 w-6">{providerIcon}</div>
      <span className="text-xl font-bold text-green-500">{providerName}</span>
    </div>
  );
};

export default AuthProviderButton;
