export const getHelperText = (type) => {
  switch (type) {
    case 'required':
      return '필수 입력 값';

    default:
      return '';
  }
};
