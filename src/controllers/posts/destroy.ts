import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { Post } from 'orm/entities/posts/Post';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const postRepository = getRepository(Post);
  try {
    const post:Post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Post with id:${id} doesn't exists.`]);
      return next(customError);
    }
    postRepository.delete(id);

    res.customSuccess(200, 'Post successfully deleted.', { id: post.id, postName: post.postName, description: post.postDescription });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
