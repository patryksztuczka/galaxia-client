import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Input from '../../components/Input/Input';
import { ICreateEventFormValues } from '../../types/ICreateEventFormValues';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useBoundStore } from '../../zustand/store';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const user = useAuth()?.session?.user;

  const createEvent = useBoundStore((state) => state.createEvent);

  const createEventStatus = useBoundStore((state) => state.createEventStatus);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateEventFormValues>();

  const onSubmit: SubmitHandler<ICreateEventFormValues> = async ({
    name,
    description,
    startDate,
    startTime,
    endDate,
    endTime,
  }) => {
    if (!user) return;
    const input = {
      name,
      description: description || '',
      start_datetime: `${startDate}T${startTime}:00+00:00`,
      end_datetime: `${endDate} ${endTime}:00+00:00`,
      author: user.id,
    };
    createEvent(input);
  };

  return (
    <div className="flex h-full flex-col gap-2 bg-white p-4 md:rounded-lg">
      <h1 className="text-xl font-bold">Create event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pb-4">
        <span>Event name:</span>
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
              placeholder="Type your event name..."
              value={value}
              onChange={onChange}
              error={errors.name?.message}
            />
          )}
        />
        <span>Start date:</span>
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
              type="date"
              placeholder="Pick start date..."
              value={value}
              onChange={onChange}
              error={errors.startDate?.message}
            />
          )}
        />
        <span>Start time:</span>
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
              type="time"
              placeholder="Pick start date..."
              value={value}
              onChange={onChange}
              error={errors.startTime?.message}
            />
          )}
        />
        <span>End date:</span>
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
              type="date"
              placeholder="Pick end date..."
              value={value}
              onChange={onChange}
              error={errors.endDate?.message}
            />
          )}
        />
        <span>End time:</span>
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
              type="time"
              placeholder="Pick start date..."
              value={value}
              onChange={onChange}
              error={errors.endTime?.message}
            />
          )}
        />
        <span>Event description:</span>
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <Input
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
