import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import { ILoginFormValues } from "../../types/ILoginFormValues";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AuthProviderButton from "../../components/AuthProviderButton/AuthProviderButton";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import SwitchFormAnimation from "../../components/SwitchFormAnimation/SwitchFormAnimation";

const LoginPage = () => {
  const { control, handleSubmit } = useForm<ILoginFormValues>();

  const onSubmit: SubmitHandler<ILoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <SwitchFormAnimation>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-5xl font-bold text-center mb-8">Log in.</h1>
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Email"
              type="text"
              placeholder="Type your email"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Password"
              type="password"
              placeholder="Type your password"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <span className="text-right font-semibold cursor-pointer mb-4">
          Forgot password
        </span>
        <Button type="submit" text="Log in" />
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-0.5 bg-zinc-200" />
          <span className="font-semibold text-zinc-200 select-none">or</span>
          <div className="flex-1 h-0.5 bg-zinc-200" />
        </div>
        <AuthProviderButton
          providerName="Log in with Google"
          providerIcon={<GoogleIcon />}
        />
        <div className="flex gap-2 justify-center mt-4">
          <span>Don't have an account?</span>
          <Link to="/signup" className="font-semibold">
            Sign up.
          </Link>
        </div>
      </form>
    </SwitchFormAnimation>
  );
};

export default LoginPage;
