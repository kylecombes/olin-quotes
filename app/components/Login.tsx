import * as React from 'react';

const Login: React.FC = () => {
  return (
    <div className="login-signup">
      <h1>Olin Quotes</h1>
      <a
        className="button"
        // @ts-ignore
        href={`${window.SERVER_URI}/google`}
        title="Login with Google"
        >
        Login with Google
      </a>
      <a
        className="button"
        // @ts-ignore
        href={`${window.SERVER_URI}/facebook`}
        title="Login with Facebook"
        >
        Login with Facebook
      </a>
    </div>
  );
};

export default Login;
