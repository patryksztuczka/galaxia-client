import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/Button/Button';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import Input from '../../components/Input/Input';
import { useBoundStore } from '../../zustand/store';
import { ISettingsFormValues } from '../../types/ISettingsFormValues';
import { supabase } from '../../supabaseClient';

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setValue } = useForm<ISettingsFormValues>();

  const user = useBoundStore((state) => state.user);

  const updateUser = useBoundStore((state) => state.updateUser);

  const updateUserStatus = useBoundStore((state) => state.updateUserStatus);

  const onSubmit: SubmitHandler<ISettingsFormValues> = async ({ avatar, bio }) => {
    try {
      setIsLoading(true);

      let fileName = null;

      if (avatar instanceof File) {
        const fileExtension = avatar.name.split('.').pop();
        fileName = `${uuidv4()}.${fileExtension}`;
        await supabase.storage.from('avatars').upload(fileName, avatar, {
          cacheControl: '3600',
          upsert: false,
        });
      }

      if (user) {
        const input = {
          ...user,
          bio,
          avatar: fileName ? fileName : user.avatar,
        };

        updateUser(user.id, input);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('avatar', user.avatar);
      setValue('bio', user.bio || '');
    }
  }, []);

  return (
    <div className="flex h-full w-full p-4 md:rounded-lg">
      <form className="flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold">Settings</h1>
        <section className="flex flex-col pt-4">
          <h2 className="pb-4 font-semibold">Profile photo</h2>
          <div className="flex justify-center">
            <div className="flex h-36 w-36">
              <Controller
                control={control}
                name="avatar"
                render={({ field: { value, onChange } }) => (
                  <ImageUpload value={value} onChange={onChange} />
                )}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col py-4">
          <h2 className="pb-4 font-semibold">Details</h2>
          <Controller
            control={control}
            name="bio"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Input
                type="text"
                label="Bio"
                placeholder="Tell something about you..."
                value={value}
                onChange={onChange}
              />
            )}
          />
        </section>
        <Button type="submit" text="Save changes" isLoading={isLoading || updateUserStatus} />
      </form>
    </div>
  );
};

export default SettingsPage;
