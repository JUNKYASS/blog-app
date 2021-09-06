import React, { useEffect, useState } from 'react';
import { useGetUserQuery, User } from '../../graphql/generated';
import { DropdownMenu } from '../DropdownMenu';
import './style.scss';

const Header: React.FC = () => {
  const [userData, setUserData] = useState<User>();
  const [userInitials, setUserInitials] = useState<string | undefined>('');
  const { data, loading } = useGetUserQuery({ // Кастомный хук запрсоа gql
    variables: {
      id: '1'
    },
    onCompleted: data => {
      setUserData({...data.user}); // Запоминаем данные пользователя в State
      setUserInitials(data.user?.name?.split(' ').map(word => word[0]).join('')); // Сохраняем инициалы пользователя для отображения в хедере
    }
   });

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <header>
      <div className="inner container-centered container">
        <div className={`user-controls load-${userInitials}`} data-name={userInitials}>
          <DropdownMenu />
        </div>
      </div>
      {/* { !loading ? <div>{userData?.name}</div> : <div>nothing</div> } */}
    </header>
  );
};

export {
  Header
};