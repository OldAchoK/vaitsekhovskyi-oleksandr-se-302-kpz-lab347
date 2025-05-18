import { Router } from 'express';

import { list, show, edit, destroy, create } from 'controllers/posts';

import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';
import { validatorEdit } from '../../middleware/validation/posts';

const router = Router();

router.get('/', list);

router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'])], show);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorEdit], edit);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

router.post('/create', checkJwt, create);

export default router;