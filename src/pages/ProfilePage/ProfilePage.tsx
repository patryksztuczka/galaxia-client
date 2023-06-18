import { useEffect } from 'react';

import { useBoundStore } from '../../zustand/store';
import userPlaceholderImage from '../../assets/images/user-placeholder.jpg';

const ProfilePage = () => {
  const getUserById = useBoundStore((state) => state.getUserById);

  const getUserByIdStatus = useBoundStore((state) => state.getUserByIdStatus);

  const user = useBoundStore((state) => state.user);

  useEffect(() => {
    if (window.location.pathname) {
      const userId = window.location.pathname.split('/')[2];
      getUserById(userId);
    }
  }, [window.location.pathname]);

  if (user === undefined || getUserByIdStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col bg-white md:rounded-lg">
      <div className="relative flex h-10 w-full bg-purple-900 md:h-16 md:rounded-t-lg">
        <img
          src={user.avatar_url || userPlaceholderImage}
          alt="User's profile photo"
          className="absolute left-4 top-3 h-14 w-14 rounded-full border-4 border-purple-900 md:h-28 md:w-28"
        />
      </div>
      <div className="flex justify-end px-4 pt-2">
        <button
          type="button"
          className="h-10 w-fit rounded-lg bg-purple-300 p-2 font-medium text-white"
        >
          Edit profile
        </button>
      </div>
      <div className="px-4 md:mt-6">
        <h1 className="text-xl font-bold md:text-3xl">{user.full_name}</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
