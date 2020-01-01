import * as React from 'react';
import {
  IPerson,
} from '../../data/types';

type Props = {
  person: IPerson
};

export default class PersonInfoPage extends React.Component<Props> {

  render() {
    if (!this.props.person) {
      return null;
    }
    return (
      <div className="person-info">
        <div className="header">
          <img className="avatar" src={this.props.person.avatarUrl} />
          <span className="name">{this.props.person.displayName}</span>
        </div>
      </div>
    )
  }

}
