import * as React from 'react';

const Login: React.FC = () => {
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
    </div>
  );
};

export default Login;
