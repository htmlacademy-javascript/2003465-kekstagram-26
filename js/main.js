const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES =[
  'Егор Н',
  'Александр Л',
  'Вера С',
  'Ангелина А',
  'Андрей Т',
  'Максим В',
  'Светлана В',
  'Василий И',
  'Константин В',
  'Мария П',
  'Екатерина Р',
  'Юлия Е',
  'Иван С',
];

const MIN_LIKES = 15;

const MAX_LIKES = 200;


//Случайное число из диапазона
function randomize(min, max) {
  if (min > max || min === max || min < 0) {
    return'Неверный диапазон';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Проверка длины строки
function checkStringLength(string, length) {
  if (string.length > length) {
    return false;
  }
  return true;
}

checkStringLength('dsgdsg', 20);


//Генерация комментариев
function generateComment() {
  const COMMENT = {};
  COMMENT.id = randomize(1, 10000);
  COMMENT.avatar = `img/avatar-${randomize(1, 6)}.svg`;
  COMMENT.message = MESSAGES[randomize(0, MESSAGES.length - 1)];
  COMMENT.name = NAMES[randomize(0, NAMES.length - 1)];

  return COMMENT;
}

//Генерация объектов
function generateObjects() {
  const PHOTOS_DESCRIPTIONS = [];
  for (let i = 1; i <= 25; i++) {
    const NEW_DESCRIPTION = {};
    NEW_DESCRIPTION.id = i;
    NEW_DESCRIPTION.url = `photos/${i}.jpg`;
    NEW_DESCRIPTION.description = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.';
    NEW_DESCRIPTION.likes = randomize(MIN_LIKES, MAX_LIKES);
    NEW_DESCRIPTION.comments = [];
    for (let j = 0; j <= randomize(0, 1); j++) {
      NEW_DESCRIPTION.comments.push(generateComment());
    }
    PHOTOS_DESCRIPTIONS.push(NEW_DESCRIPTION);
  }
  return PHOTOS_DESCRIPTIONS;
}


generateObjects();
