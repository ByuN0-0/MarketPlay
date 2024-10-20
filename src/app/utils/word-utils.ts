const wordUtils = (word: string | null) => {
  if (!word) return null;
  if (word.includes('apple')) {
    return '사과';
  } else if (word.includes('duck')) {
    return '오리';
  } else if (word.includes('giraffe')) {
    return '기린';
  } else if (word.includes('grapes')) {
    return '포도';
  } else if (word.includes('lion')) {
    return '사자';
  } else if (word.includes('note')) {
    return '노트';
  } else if (word.includes('pencil')) {
    return '연필';
  } else if (word.includes('pencilcase')) {
    return '필통';
  } else if (word.includes('pig')) {
    return '돼지';
  } else if (word.includes('scissor')) {
    return '가위';
  } else if (word.includes('strawberry')) {
    return '딸기';
  } else if (word.includes('watermelon')) {
    return '수박';
  }
  return null;
};

export default wordUtils;

