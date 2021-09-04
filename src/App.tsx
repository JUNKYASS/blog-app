import React from 'react';
import { useGetUserQuery } from './graphql/generated';

const { data, loading, error } = useGetUserQuery({
  variables: {
    id: '1' // value for 'id'
  },
 });



const App: React.FC = () => {
  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <div>Hi, i'll try to use GraphQL today!:)</div>
  );
};

export default App;