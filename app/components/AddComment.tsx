import * as React from 'react';

type Props = {
  onCancel?: () => any
  onSubmit: (commentText: string) => any
};

type State = {
  comment: string
};

export default class AddComment extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = Object.assign({}, this.originalState);
  }

  originalState = {
    comment: '',
  };

  onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      comment: event.target.value,
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
