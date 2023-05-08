import { useMutation } from 'react-query';
import { axiosModule } from './axios';
import { CommentType } from '../enum/enum';
import { handleError } from './cm_callsvc';

export const postComment = ({ commentType, teamIdx, postIdx, thenFn }) => {
  switch (commentType) {
    case CommentType.NOTC: {
      return useMutation((form) =>
        axiosModule.post(`/notice/${teamIdx}/${postIdx}/comment`, form).then(thenFn).catch(handleError)
      );
    }
  }
};
