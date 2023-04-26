import * as yup from 'yup';

export const signUpYup = yup.object({
  memberId: yup.string().required('아이디를 입력해주세요.'),
  memberPassword: yup.string().required('비밀번호를 입력해주세요.'),
  confirmPassword: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .oneOf([yup.ref('memberPassword')], '비밀번호가 일치하지 않습니다.'),
  memberName: yup.string().required('이름을 입력해주세요.'),
});
