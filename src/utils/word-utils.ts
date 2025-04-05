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
    return '공책';
  } else if (word.includes('pencilcase')) {
    return '필통';
  } else if (word.includes('pencil')) {
    return '연필';
  } else if (word.includes('pig')) {
    return '돼지';
  } else if (word.includes('scissor')) {
    return '가위';
  } else if (word.includes('strawberry')) {
    return '딸기';
  } else if (word.includes('watermelon')) {
    return '수박';
  } else if (word.includes('onion')) {
    return '양파';
  } else if (word.includes('ramen')) {
    return '라면';
  } else if (word.includes('tofu')) {
    return '두부';
  } else if (word.includes('lemon')) {
    return '레몬';
  } else if (word.includes('carrot')) {
    return '당근';
  } else if (word.includes('milk')) {
    return '우유';
  }
  return null;
};

export default wordUtils;

