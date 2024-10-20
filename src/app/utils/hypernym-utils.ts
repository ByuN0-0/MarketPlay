const hypernymUtils = (hypernym: string | null) => {
  if (!hypernym) return null;
  if (hypernym.includes('school')) {
    return '학용품';
  } else if (hypernym.includes('fruit')) {
    return '과일';
  } else if (hypernym.includes('animal')) {
    return '동물';
  }
  return null;
};

export default hypernymUtils;