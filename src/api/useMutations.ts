import { useMutation } from 'react-query';
import { axiosModule } from './axios';
import { CommentType } from '../enum/enum';
import { handleError } from './cm_callsvc';
import { CommentInterface } from './interfaces';

export const usePetCreateCommentMutation = ({ commentType, teamIdx, postIdx, thenFn }) => {
  switch (commentType) {
    case CommentType.NOTC: {
      return useMutation((form: CommentInterface) =>
        axiosModule.post(`/notice/${teamIdx}/${postIdx}/comment`, form).then(thenFn).catch(handleError)
      );
    }
    case CommentType.PLACE: {
      return useMutation((form: CommentInterface) =>
        axiosModule.post(`/comm/comment`, form).then(thenFn).catch(handleError)
      );
    }
  }
};
