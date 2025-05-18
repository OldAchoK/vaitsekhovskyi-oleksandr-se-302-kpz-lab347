import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { User } from '../../orm/entities/users/User';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { postName, postDescription, userId } = req.body;

  const postRepository = getRepository(Post);
  const userRepository = getRepository(User);
  try {
    try {
      const user = await userRepository.findOne(userId);

      if (!user) {
        const customError = new CustomError(404, 'General', `User with id ${userId} not found`);
        return next(customError);
      }

      const newPost = new Post();
      newPost.postName = postName;
      newPost.postDescription = postDescription;
      newPost.author = user;
      await postRepository.save(newPost);
      res.customSuccess(200, 'Post successfully created.');
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `Post '${postName}' can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};