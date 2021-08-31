module.exports.requestError = 400;
module.exports.notFoundError = 404;
module.exports.serverError = 500;
module.exports.autorizationError = 401;
module.exports.forbiddenError = 403;
module.exports.conflictRequestError = 409;

module.exports.userIdNotFound = 'Пользователь по указанному _id не найден.';
module.exports.IdNotValid = 'Невалидный id.';
module.exports.userIncorrect = 'Переданы некорректные данные при создании пользователя.';
module.exports.userAlreadyExist = 'Пользователь с таким email уже зарегистрирован.';
module.exports.userCreateIncorrect = 'Переданы некорректные данные при обновлении профиля.';
module.exports.userDublicateEmail = 'Данный e-mail уже используется другим пользователем.';
module.exports.userExit = 'Пользователь вышел';
module.exports.serverErrorText = 'На сервере произошла ошибка';
module.exports.authRequired = 'Необходима авторизация';
module.exports.unvalidImage = 'Необходима авторизация';
module.exports.unvalidTrailer = 'Необходима авторизация';
module.exports.unvalidThumbnail = 'Необходима авторизация';
module.exports.pageNotFound = 'Страница не найдена';
module.exports.errorUserorPassword = 'Неправильные почта или пароль';
module.exports.emailIncorrect = 'Email некорректный';
module.exports.incorrectImageLinc = 'Ссылка на изображение некорректна';
module.exports.incorrectTrailerLinc = 'Ссылка на трейлер некорректна';
module.exports.incorrectThumbnailLinc = 'Ссылка на превью некорректна';
module.exports.movieCreateIncorrect = 'Переданы некорректные данные при создании фильма.';
module.exports.deleteMovieForbid = 'Нельзя удалить чужой фильм.';
module.exports.movieDeleted = 'Фильм удален';
module.exports.movieIdNotFound = 'Фильм с указанным _id не найден.';

module.exports.corsOptions = {
  origin: [
    'https://artem-diplomaproject.nomoredomains.club/',
    'http://artem-diplomaproject.nomoredomains.club/',
    '5.166.68.59',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://localhost:3005',
    'https://localhost:3005',
    'http://localhost:5000',
    'https://localhost:5000',
    'http://localhost:5000/',
    'https://localhost:5000/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Access-Control-Allow-Credentials'],
  credentials: true,
};
