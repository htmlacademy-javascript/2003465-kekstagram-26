function randomize(min, max) {
  if (min > max || min === max || min < 0) {
    return'Неверный диапазон';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkStringLength(string, length) {
  if (string.length > length) {
    return false;
  }
  return true;
}

export {randomize, checkStringLength};
