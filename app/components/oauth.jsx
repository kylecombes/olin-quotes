import React from 'react';

export default class OAuth extends React.Component {

  state = {
    user: {},
    disabled: '',
  };

  componentDidMount() {
    const { socket } = this.props;
  }

  // Kicks off the processes of opening the popup on the server and listening
  // to the popup. It also disables the login button so the user can not
  // attempt to login to the provider twice.
  startAuth(e) {
    const { provider, socket } = this.props;
    window.location = `${this.props.server}/${provider}?socketId=${socket.io.engine.id}`;
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