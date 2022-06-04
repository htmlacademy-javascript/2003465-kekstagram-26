//Случайное число из диапазона
function randomize(min, max) {
  if (min > max || min === max || min < 0) {
    return'Неверный диапазон';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomize(1,5);

//Проверка длины строки
function checkedStringLength(_string, _length) {
  if (_string.length > _length) {
    return false;
  }
  return true;
}

checkedStringLength('dsgdsg', 20);
