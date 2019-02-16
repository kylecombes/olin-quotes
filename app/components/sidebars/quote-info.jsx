import React from 'react';
import CommentAdd from '../comment-add';

export default class PersonInfo extends React.Component {

  addComment = commentText => {
    this.props.addComment(this.props.quote._id, commentText);
  };

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

    const comments = this.props.quote.comments ? this.props.quote.comments.map(comment => {
      const author = this.props.people[comment.authorId];
      return (
        <div className="comment">
          <p>{comment.text}</p>
          <p>- {author.displayName}</p>
        </div>
      );
    }) : <p className="no-comments">No comments</p>;

    return (
      <div className="quote-info">
        <h1 className="centered">Quote Details</h1>
        <div className="quote">
          {quoteElement}
        </div>
        <div className="quote-stats">
        </div>
        <div className="comments">
          <h2>Comments</h2>
          {comments}
          <CommentAdd onSubmit={this.addComment}/>
        </div>
      </div>
    )
  }

}