import React, { useState } from 'react';
import { useGetUserQuery } from '../../graphql/generated';
import { LoadingSpinner } from '../LoadingSpinner';
import './style.scss';

const ProfileForm: React.FC = () => {
  const [userInitials, setUserInitials] = useState<string | undefined>('');
  const [createFormValues, setCreateFormValues] = useState<any>(); // import { ProfileFormValues } from '../../types';
  const { loading } = useGetUserQuery({ // Кастомный хук запрсоа gql
    variables: {
      id: '1'
    },
    onCompleted: data => {
      if (data.user) setCreateFormValues({ ...data.user, description: 'Some description of a user' });

      setUserInitials(data.user?.name?.split(' ').map(word => word[0]).join('')); // Сохраняем инициалы пользователя для отображения
    }
  });

  // useEffect(() => {
  //   console.log(createFormValues);
  // }, [createFormValues]);

  const setFormValuesHandler = (name: string) => { // Функция установки значений инпутов в стейт
    return ({ target: { value } }: any) => {
      setCreateFormValues((oldValues: any) => ({ ...oldValues, [name]: value }));
    };
  };

  return !loading && createFormValues ? (
    <div className="profile-form">
      <div className={`avatar load-${userInitials}`} data-name={userInitials}></div>
      {<div className="info">
        <label className="name">
          <span className="label-name">Profile name</span>
          <input type="text" name="name" value={createFormValues.name} onChange={setFormValuesHandler('name')} />
        </label>
        <label className="description">
          <span className="label-name">Description</span>
          <textarea name="description" value={createFormValues.description} onChange={setFormValuesHandler('description')}>{createFormValues.description}</textarea>
        </label>
        <label className="email">
          <span className="label-name">Email</span>
          <input type="email" name="email" value={createFormValues.email} onChange={setFormValuesHandler('email')} />
        </label>
        <label className="website">
          <span className="label-name">Website</span>
          <input type="text" name="website" value={createFormValues.website} onChange={setFormValuesHandler('website')} />
        </label>
        <label className="company">
          <span className="label-name">Company name</span>
          <input type="text" name="company" value={createFormValues.company.name} onChange={setFormValuesHandler('company')} disabled />
        </label>
        <label className="phone">
          <span className="label-name">Phone</span>
          <input type="text" name="phone" value={createFormValues.phone} onChange={setFormValuesHandler('phone')} disabled />
        </label>
        <label className="address">
          <span className="label-name">Address</span>
          <input type="text" name="address" value={createFormValues.address.city} onChange={setFormValuesHandler('address')} disabled />
        </label>
      </div>}
    </div>
  ) : (
    <LoadingSpinner />
  );
};

export {
  ProfileForm
};