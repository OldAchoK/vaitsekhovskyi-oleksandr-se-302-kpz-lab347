import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  let { postName, postDescription } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const postRepository = getRepository(Post);

  postName = !postName ? '' : postName;
  postDescription = !postDescription ? '' : postDescription;

  const user = await postRepository.findOne({ postName });
  if (user) {
    errorsValidation.push({ postName: `Postname '${postName}' already exists` });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit user validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
