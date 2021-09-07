import React, { useState } from 'react';
import { useGetUserQuery } from '../../graphql/generated';
import { DropdownMenu } from '../DropdownMenu';
import './style.scss';

const Header: React.FC = () => {
  const [userInitials, setUserInitials] = useState<string | undefined>('');
  const { data, loading } = useGetUserQuery({ // Кастомный хук запрсоа gql
    variables: {
      id: '1'
    },
    onCompleted: (data) => {
      if (data) setUserInitials(data.user?.name?.split(' ').map(word => word[0]).join('')); // Сохраняем инициалы пользователя для отображения в хедере
    }
  });

  return (
    <header>
      <div className="inner container-centered container">
        <div className={`user-controls load-${userInitials}`} data-name={userInitials}>
          <DropdownMenu />
        </div>
      </div>
    </header>
  );
};

export {
  Header
};