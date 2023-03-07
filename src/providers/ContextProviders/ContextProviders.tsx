import { IContextProvidersProps } from "./ContextProviders.types";
import { AuthProvider } from "../../context/AuthContext/AuthContext";

const ContextProviders = ({ children }: IContextProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProviders;
