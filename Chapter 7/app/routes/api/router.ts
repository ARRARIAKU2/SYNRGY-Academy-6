import { Router } from 'express';

// controllers
import ControllerAuth from '../../controllers/api/ControllerAuth';
import ControllerBooks from '../../controllers/api/ControllerBooks';

// middlewares
import MiddlewareAuth from '../../middlewares/Auth';

// services
import ServiceBooks from '../../services/ServiceBooks';
import ServiceAuth from '../../services/ServiceAuth';

// repositories
import RepoBooks from '../../repositories/RepoBooks';
import RepoUsers from '../../repositories/RepoUsers';

import media from '../../config/media';

const router = Router();

const middlewareAuth = new MiddlewareAuth();

// Auth
const repoUser = new RepoUsers();
const serviceAuth = new ServiceAuth(repoUser);
const controllerAuth = new ControllerAuth(serviceAuth);

// Books
const repoBooks = new RepoBooks();
const serviceBooks = new ServiceBooks(repoBooks);
const controllerBook = new ControllerBooks(serviceBooks);

// auth
router.post('/auth/login', controllerAuth.login());
router.post(
  '/auth/register-admin',
  middlewareAuth.authorizeSuperAdmin,
  controllerAuth.registerAdmin()
);

// books
router.get('/books', controllerBook.list());
router.get('/books/:id', controllerBook.show());
router.post('/books', middlewareAuth.authorize, controllerBook.create());
router.put('/books/:id', middlewareAuth.authorize, controllerBook.update());
router.delete('/books/:id', middlewareAuth.authorize, controllerBook.remove());

// upload
router.post(
  '/books/upload',
  [middlewareAuth.authorize, media.upload.single('cover')],
  controllerBook.upload()
);

export default router;
