const isValid = (pattern: RegExp, text: string) => {
  return new RegExp(pattern).test(text);
};
export default isValid;
