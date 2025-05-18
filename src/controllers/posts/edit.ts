import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { postName, postDescription } = req.body;

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} not found.`, ['Post not found.']);
      return next(customError);
    }

    post.postName = postName;
    post.postDescription = postDescription;

    try {
      await postRepository.save(post);
      res.customSuccess(200, 'User successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Post '${post.postName}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
