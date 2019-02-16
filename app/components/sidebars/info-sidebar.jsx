import React from 'react';
import PersonAdd from '../../containers/person-add';
import PersonStats from '../../containers/person-info';
import QuoteInfo from '../../containers/quote-info';

export default class DetailsSidebar extends React.Component {

  render() {
    let content = null;
    switch (this.props.sidebarType) {
      case 'personAdd':
        content = <PersonAdd/>;
        break;
      case 'personInfo':
        content = <PersonStats/>;
        break;
      case 'quoteInfo':
        content = <QuoteInfo/>;
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