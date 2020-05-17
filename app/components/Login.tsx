import * as React from 'react';
import {
  useApolloClient,
  useMutation,
} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';

const LOGIN = gql`
  mutation Login($id: ID!) {
    login(id: $id) {
      success
      token
      user {
        accountSetupComplete
        firstName
        lastName
      }
    }
  }
`;

const tempLogin = (login: any, id: string) => login({
  variables: {
    id,
  },
});

const Login: React.FC = () => {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error } ] = useMutation(
    LOGIN,
    {
      onCompleted: ({ login: { success, token } }) => {
        if (success) {
          localStorage.setItem('token', token);
          client.writeData({data: {isLoggedIn: true}});
        }
      }
    }
  );

  const [id, setId] = React.useState('');

  return (
    <div className="login-signup">
      <h1>Olin Quotes</h1>
      <button
        className="button"
        // @ts-ignore
        onClick={() => window.location =`${window.SERVER_URI}/google`}
        title="Login with Google"
        >
        Login with Google
      </button>
      <button
        // @ts-ignore
        onClick={() => window.location =`${window.SERVER_URI}/facebook`}
        title="Login with Facebook"
        >
        Login with Facebook
      </button>
      <input onChange={e => setId(e.target.value)} value={id} />
      <button onClick={() => tempLogin(login, id)}>Login</button>
    </div>
  );
};

export default Login;
