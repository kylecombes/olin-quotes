import React from 'react';
import NavSidebar from './sidebars/nav-sidebar';
import MultiQuoteView from '../containers/multi-quote-view';
import PersonAdd from '../containers/person-add';
import PersonStats from '../containers/person-stats';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addPersonVisible: false,
      personStatsVisible: false,
    };
  }

  onAddPersonClicked = () => this.setState({addPersonVisible: true});

  closeAddPersonPane = () => this.setState({addPersonVisible: false});

  render() {
    const addPerson = this.state.addPersonVisible
      ? <PersonAdd closeAddPersonPane={this.closeAddPersonPane}/>
      : null;
    const personStats = this.props.infoSidebar.sidebarType === 'personStats' &&
      <PersonStats/>;

    return (
      <div className="app">
        <NavSidebar/>
        <MultiQuoteView onAddPersonClicked={this.onAddPersonClicked} />
        {addPerson}
        {personStats}
      </div>
    );
  }
}
