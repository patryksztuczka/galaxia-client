import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ISignupFormValues } from '../../types/ISignupFormValues';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import AuthProviderButton from '../../components/AuthProviderButton/AuthProviderButton';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import SwitchFormAnimation from '../../components/SwitchFormAnimation/SwitchFormAnimation';
import { supabase } from '../../supabaseClient';

const SignupPage = () => {
  const { auth } = supabase;
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormValues>();

  const onSubmit: SubmitHandler<ISignupFormValues> = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) => {
    try {
      if (password !== confirmPassword) return;
      setIsLoading(true);
      const { data, error } = await auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
          },
        },
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
        <h1 className="mb-8 text-center text-5xl font-bold">Sign up.</h1>
        <div className="flex flex-col gap-4 md:flex-row">
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: 'First name is required',
              },
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="First name"
                type="text"
                placeholder="Type your first name"
                value={value}
                onChange={onChange}
                error={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: 'Last name is required',
              },
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Last name"
                type="text"
                placeholder="Type your last name"
                value={value}
                onChange={onChange}
                error={errors.lastName?.message}
              />
            )}
          />
        </div>
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
              placeholder="Pick a strong password"
              value={value}
              onChange={onChange}
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: 'Password confirmation is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Confirm password"
              type="password"
              placeholder="Type picked password again"
              value={value}
              onChange={onChange}
              error={errors.confirmPassword?.message}
            />
          )}
        />
        <div className="mt-5">
          <Button type="submit" text="Sign up" isLoading={isLoading} />
        </div>
        <div className="my-6 flex items-center gap-2">
          <div className="h-0.5 flex-1 bg-zinc-200" />
          <span className="select-none font-semibold text-zinc-200">or</span>
          <div className="h-0.5 flex-1 bg-zinc-200" />
        </div>
        <AuthProviderButton providerName="Sign up with Google" providerIcon={<GoogleIcon />} />
        <div className="mt-4 flex justify-center gap-2">
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
