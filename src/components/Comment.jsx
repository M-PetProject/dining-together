import React, { useEffect } from 'react';
import { getCommentQuery } from '../api/queryHooks';

export default function Comment(props) {
  const svc = useService(props);

  return <div>Comment</div>;
}

const useService = (props) => {
  const { team_idx, idx, comment_type } = props;

  const commentQuery = getCommentQuery(team_idx, idx, comment_type);

  useEffect(() => {
    if (commentQuery.isSuccess) {
      console.log(commentQuery.data);
    }
  });

  return {};
};
