import React from 'react';

export default class AddComment extends React.Component {

  constructor(props) {
    super(props);

    this.originalState = {
      comment: '',
    };
    this.state = Object.assign({}, this.originalState);
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.comment);
    this.setState(this.originalState);
  };

  render() {
    return (
      <div className="comment-add">
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
