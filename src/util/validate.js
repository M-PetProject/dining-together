export const getHelperText = (type) => {
  switch (type) {
    case 'required':
      return '필수 입력 값';

    case 'maxLength':
      return '최대 글자수 초과';
    default:
      return '';
  }
};
