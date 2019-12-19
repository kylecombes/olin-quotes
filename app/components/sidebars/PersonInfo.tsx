import * as React from 'react';
import {
  IPerson,
} from '../../data/types';

type Props = {
  person: IPerson
};

export default class PersonInfo extends React.Component<Props> {

  render() {
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