import React from 'react';
import CommentAdd from '../comment-add';

export default class PersonInfo extends React.Component {

  render() {
    const quoteElement = this.props.quote.components.map(comp => {
      const speaker = this.props.people[comp.personId];
      return (
        <div className="quote-component" key={comp.words}>
          <img src={speaker.avatarUrl} title={speaker.displayName} onClick={() => this.props.showPersonStats(speaker._id)} />
          <div className="words">
            {comp.words}
          </div>
        </div>
      );
    });

    const comments = [];

    return (
      <div className="quote-info">
        <div className="quote">
          {quoteElement}
        </div>
        <div className="quote-stats">
          (Number of likes/hearts goes here)
        </div>
        <div className="comments">
          {comments}
          <CommentAdd/>
        </div>
      </div>
    )
  }

}