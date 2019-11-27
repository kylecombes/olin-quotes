import React from 'react';

export default class Login extends React.Component {

  render() {
    return (
      <div className="login-signup">
        <h1>Olin Quotes</h1>
        <OAuth
          provider="google"
          label="Log in with Google"
          {...this.props}
        />
        <OAuth
          provider="facebook"
          label="Log in with Facebook"
          {...this.props}
        />
      </div>
    )
  }

}

class OAuth extends React.Component {

  state = {
    user: {},
    disabled: '',
  };

  startAuth(e) {
    const {
      provider,
    } = this.props;
    window.location = `${window.SERVER_URI}/${provider}`;
  }

  render() {
    const { name, photo} = this.state.user;
    const {
      provider,
      label,
    } = this.props;
    const { disabled } = this.state;
    return (
      <div className="login-signup">
        {name
          ? <div className={'card'}>
            <img src={photo} alt={name} />
            <h4>{name}</h4>
          </div>
          : <div className={'button-wrapper fadein-fast'}>
            <button
              onClick={this.startAuth.bind(this)}
              className={`${provider} ${disabled} button`}
            >
              {label || provider}
            </button>
          </div>
        }
      </div>
    )
  }

}
