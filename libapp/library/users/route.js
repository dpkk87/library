var express = require('express');
var router = express.Router({ mergeParams: true });

const UserData = require('./data').default;
const UserService = require('./service').default;
const db = require('../../initialsetup/db').default;
const books = require('./books/route');
var createError = require('http-errors');

const userData = new UserData(db);
const userService = new UserService(userData);

/* GET home page. */
router.get('/', async function (req, res, next) {
  const users = await userService.getUsers();
  res.send(users);
});

router.get('/:userId', async function (req, res, next) {
  try {
    const user = await userService.getUser(req.params.userId);
    res.send(user);
  } catch (error) {
    next(createError(400, 'user is not registered in library'));
  }
})

router.post('/', async function (req, res, next) {
  try {
    const success = await userService.addUser(req.query);
    res.send(success);
  } catch (error) {
    next(createError(400, 'User cannot be added to library'));
  }
});

router.delete('/:userId', async function (req, res, next) {
  try {
    const success = await userService.deleteUser(req.params.userId);
    res.send(success);
  } catch (error) {
    next(createError(400, 'Requested user cannot be deleted'));
  }
});

router.use('/:userId/books', books);

module.exports = router;
