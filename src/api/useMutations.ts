import { useMutation } from 'react-query';
import { axiosModule } from './axios';
import { CommCommentType } from '../enum/enum';
import { handleError } from './cm_callsvc';
import { CommentReqInterface } from './interfaces';

export const usePetCreateCommentMutation = ({ commentType, teamIdx, postIdx, thenFn }) => {
  switch (commentType) {
    case CommCommentType.NOTC: {
      return useMutation((form: CommentReqInterface) =>
        axiosModule.post(`/notice/${teamIdx}/${postIdx}/comment`, form).then(thenFn).catch(handleError)
      );
    }
    case CommCommentType.PLACE: {
      return useMutation((form: CommentReqInterface) =>
        axiosModule.post(`/comm/comment`, form).then(thenFn).catch(handleError)
      );
    }
  }
};
