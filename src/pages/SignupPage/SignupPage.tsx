import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import { ISignupFormValues } from "../../types/ISignupFormValues";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AuthProviderButton from "../../components/AuthProviderButton/AuthProviderButton";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import SwitchFormAnimation from "../../components/SwitchFormAnimation/SwitchFormAnimation";

const SignupPage = () => {
  const { control, handleSubmit } = useForm<ISignupFormValues>();

  const onSubmit: SubmitHandler<ISignupFormValues> = (data) => {
    console.log(data);
  };

  return (
    <SwitchFormAnimation>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-5xl font-bold text-center mb-8">Sign up.</h1>
        <div className="flex gap-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label="First name"
                type="text"
                placeholder="Type your first name"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Last name"
                type="text"
                placeholder="Type your last name"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
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
              placeholder="Pick a strong password"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Confirm password"
              type="password"
              placeholder="Type picked password again"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <div className="mt-5">
          <Button type="submit" text="Sign up" />
        </div>
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-0.5 bg-zinc-200" />
          <span className="font-semibold text-zinc-200 select-none">or</span>
          <div className="flex-1 h-0.5 bg-zinc-200" />
        </div>
        <AuthProviderButton
          providerName="Sign up with Google"
          providerIcon={<GoogleIcon />}
        />
        <div className="flex gap-2 justify-center mt-4">
          <span>Already have an account?</span>
          <Link to="/login" className="font-semibold">
            Log in.
          </Link>
        </div>
      </form>
    </SwitchFormAnimation>
  );
};

export default SignupPage;
