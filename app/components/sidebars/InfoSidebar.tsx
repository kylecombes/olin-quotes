import * as React from 'react';

import PersonStats from '../../containers/PersonInfo';
import QuoteInfo from '../../containers/QuoteInfo';

import {
  IPerson,
} from '../../data/types';

type Props = {
  closeSidebar: () => any
  isVisible: boolean
  person: IPerson
  sidebarType: string
};

export default class DetailsSidebar extends React.Component<Props> {

  render() {
    let content = null;
    switch (this.props.sidebarType) {
      case 'personInfo':
        content = <PersonStats/>;
        break;
      case 'quoteInfo':
        content = <QuoteInfo showPersonStats={null}/>;
        break;
    }

    const className = 'sidebar info' + (this.props.isVisible ? '' : ' collapsed');

    return (
      <div className={className}>
        <span className="close-button" onClick={this.props.closeSidebar}>X</span>
        <div className="sidebar-content">
          {content}
        </div>
      </div>
    )
  }

}
