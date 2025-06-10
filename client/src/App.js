import React from 'react';
import { gql, useQuery } from '@apollo/client';


const query = gql`
  query GetTodosWithUsers {
    getTodos {
      title
      completed
      user {
        name
        email
        phone
      }
    }
  }`;

function App() {
  const { data, loading  } = useQuery(query);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='App'> 
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <table border={1} cellPadding={10} cellSpacing={0}>
        <tbody>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Completed</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          {data.getTodos.map((todo, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>{todo.user.name}</td>
              <td>{todo.user.email}</td>
              <td>{todo.user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
