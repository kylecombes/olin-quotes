import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  branch,
  compose,
  pure,
  renderComponent,
} from 'recompose';
// import * as GetQuoteListTypes from './__generated__/GetQuoteList';

import BoardViewPagePure from '../pages/BoardViewPagePure';
import { IBoard } from '../../data/types';
import * as GetBoardViewQuotes from '../../fragments/GetBoardViewQuotes.graphql';

type Props = {
  data: {
    loading: boolean
    board: IBoard
  }
  match: {
    params: {
      boardId: string
    }
  }
};

const data = graphql(
  GetBoardViewQuotes,
  {
    options: (props: Props) => ({
      variables: {
        boardId: props.match.params.boardId,
      },
    }),
  }
);

const displayLoadingState = branch(
  (props: Props) => props.data.loading,
  renderComponent(() => <div>Loading...</div>),
);

const displayInvalidState = branch(
  (props: Props) => !props.data.board,
  renderComponent(() => <div>Unknown board</div>),
);

const BoardViewPage = compose(
  data,
  displayLoadingState,
  displayInvalidState,
  pure,
)(BoardViewPagePure);

export default BoardViewPage;
