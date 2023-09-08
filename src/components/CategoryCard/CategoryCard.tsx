import { FC } from 'react';
import clsx from 'clsx';

import { ICategoryCardProps } from './CategoryCard.types';
import { Link } from 'react-router-dom';
import { routePaths } from '../../constants';

const CategoryCard: FC<ICategoryCardProps> = ({ category }) => {
  return (
    <Link to={`${routePaths.eventsCategory}/${category}`}>
      <div
        className={clsx(
          'flex h-28 w-28 min-w-[112px] cursor-pointer flex-col items-center justify-center rounded-lg shadow-card',
          category === 'music' && 'bg-gradient-to-br from-pink-500 to-red-500',
          category === 'sports' && 'bg-gradient-to-br from-green-500 to-blue-500',
          category === 'tech' && 'bg-gradient-to-br from-purple-500 to-indigo-500',
          category === 'party' && 'bg-gradient-to-br from-yellow-500 to-red-500',
          category === 'arts' && 'bg-gradient-to-br from-yellow-500 to-green-500',
          category === 'health' && 'bg-gradient-to-br from-red-500 to-yellow-500',
          category === 'fashion' && 'bg-gradient-to-br from-yellow-500 to-red-500',
        )}
      >
        <span className="font-semibold text-white">#{category}</span>
        <span>
          {(category === 'music' && '🎵') ||
            (category === 'sports' && '🏀') ||
            (category === 'tech' && '👨‍💻') ||
            (category === 'party' && '🎉') ||
            (category === 'arts' && '🎨') ||
            (category === 'health' && '🏥') ||
            (category === 'fashion' && '👗')}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
