import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ILoginFormValues } from '../../types/ILoginFormValues';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import AuthProviderButton from '../../components/AuthProviderButton/AuthProviderButton';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import SwitchFormAnimation from '../../components/SwitchFormAnimation/SwitchFormAnimation';
import { supabase } from '../../supabaseClient';

const LoginPage = () => {
  const { auth } = supabase;

  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>();

  const onSubmit: SubmitHandler<ILoginFormValues> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const { data, error } = await auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SwitchFormAnimation>
      <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-center text-5xl font-bold">Log in.</h1>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Email"
              type="text"
              placeholder="Type your email"
              value={value}
              onChange={onChange}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: 'Password is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Password"
              type="password"
              placeholder="Type your password"
              value={value}
              onChange={onChange}
              error={errors.password?.message}
            />
          )}
        />
        <span className="mb-4 cursor-pointer text-right font-semibold">Forgot password</span>
        <Button type="submit" text="Log in" isLoading={isLoading} />
        <div className="my-6 flex items-center gap-2">
          <div className="h-0.5 flex-1 bg-green-200" />
          <span className="select-none font-semibold text-green-200">or</span>
          <div className="h-0.5 flex-1 bg-green-200" />
        </div>
        <AuthProviderButton providerName="Log in with Google" providerIcon={<GoogleIcon />} />
        <div className="mt-4 flex justify-center gap-2">
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
