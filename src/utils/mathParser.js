export const calculateMathExpressions = (text) => {
  const regex = /\b\d+(\s*[-+]\s*\d+)+\b/g;
  const processedText = text.replace(regex, (match) => {
    try {
      const tokens = match.replace(/\s+/g, "").match(/-?\d+|[+-]/g);
      let result = 0;
      let operator = "+";

      tokens.forEach((token) => {
        if (token === "+" || token === "-") {
          operator = token;
        } else {
          const number = parseInt(token, 10);
          result = operator === "+" ? result + number : result - number;
        }
      });

      return result;
    } catch (error) {
      return match;
    }
  });

  return processedText;
};
