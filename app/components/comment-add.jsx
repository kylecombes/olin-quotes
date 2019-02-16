import React from 'react';

export default class CommentAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.comment);
  };

  render() {
    return (
      <div className="add-comment">
        <textarea
          name="comment"
          value={this.state.comment}
          onChange={this.onInputChange}
          placeholder="Add comment"
        />
        <div className="buttons">
          <button onClick={this.props.onCancel}>Cancel</button>
          <button onClick={this.onSubmit}>Add Comment</button>
        </div>
      </div>
    )
  }

}