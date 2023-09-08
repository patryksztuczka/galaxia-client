import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Input from '../../components/Input/Input';
import { ICreateEventFormValues } from '../../types/ICreateEventFormValues';
import Button from '../../components/Button/Button';
import { useBoundStore } from '../../zustand/store';
import { useNavigate } from 'react-router-dom';
import { categories, routePaths } from '../../constants';
import image404 from '../../assets/images/404-image.svg';
import Dropdown from '../../components/Dropdown/Dropdown';

const CreateEventPage = () => {
  const navigate = useNavigate();

  const [isImageError, setIsImageError] = useState(false);

  const user = useBoundStore((state) => state.user);

  const createEvent = useBoundStore((state) => state.createEvent);

  const createEventStatus = useBoundStore((state) => state.createEventStatus);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateEventFormValues>();

  const onSubmit: SubmitHandler<ICreateEventFormValues> = async ({
    name,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
    image,
    category,
  }) => {
    if (!user) return;

    const input = {
      name,
      description: description || '',
      start_datetime: `${startDate}T${startTime}:00+00:00`,
      end_datetime: `${endDate} ${endTime}:00+00:00`,
      author: user.id,
      image: image,
      category,
    };
    createEvent(input);
    navigate(`${routePaths.profiles}/${user.id}`);
  };

  const imageWatch = watch('image');

  useEffect(() => {
    setIsImageError(false);
  }, [imageWatch]);

  return (
    <div className="flex h-full flex-col gap-2 p-4 md:rounded-lg">
      <h1 className="text-xl font-bold">Create event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pb-4">
        <div className="flex h-56 w-full items-center justify-center rounded-lg bg-green-200">
          {!imageWatch ? (
            <span className="text-white">Image preview</span>
          ) : (
            <img
              src={isImageError ? image404 : imageWatch}
              className="h-full w-full rounded-lg object-cover"
              onError={() => setIsImageError(true)}
            />
          )}
        </div>
        <Controller
          control={control}
          name="image"
          rules={{
            required: {
              value: true,
              message: 'Image URL is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              type="text"
              label="Event cover image"
              placeholder="https://example.com/image.jpg.."
              value={value}
              onChange={onChange}
              error={errors.image?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          rules={{
            required: {
              value: true,
              message: 'Category is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Dropdown
              data={categories}
              label="Event category"
              placeholder="Pick event category..."
              value={value}
              onChange={onChange}
              error={errors.category?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              type="text"
              label="Event name"
              placeholder="Type your event name..."
              value={value}
              onChange={onChange}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="startDate"
          rules={{
            required: {
              value: true,
              message: 'Start date is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Start date"
              type="date"
              placeholder="Pick start date..."
              value={value}
              onChange={onChange}
              error={errors.startDate?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="startTime"
          rules={{
            required: {
              value: true,
              message: 'Start time is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Start time"
              type="time"
              placeholder="Pick start date..."
              value={value}
              onChange={onChange}
              error={errors.startTime?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          rules={{
            required: {
              value: true,
              message: 'End date is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="End date"
              type="date"
              placeholder="Pick end date..."
              value={value}
              onChange={onChange}
              error={errors.endDate?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="endTime"
          rules={{
            required: {
              value: true,
              message: 'End time is required',
            },
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="End time"
              type="time"
              placeholder="Pick start date..."
              value={value}
              onChange={onChange}
              error={errors.endTime?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Description"
              type="text"
              placeholder="Type description..."
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button type="submit" text="Create" isLoading={createEventStatus} />
      </form>
    </div>
  );
};

export default CreateEventPage;
