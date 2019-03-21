const paramTruth = (param) => {
  const falseStringRE = /^(false|no|0|f|n)$/i;
  if (param === undefined) {
    return false;
  }
  if (param.match(falseStringRE)) {
    return false;
  }
  // even if param is empty, return true
  if (param !== undefined) {
    return true;
  }
  return !!param;
};

module.exports = {
  paramTruth
};
