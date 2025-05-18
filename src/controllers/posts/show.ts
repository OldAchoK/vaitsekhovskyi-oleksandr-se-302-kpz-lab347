import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOne(String(id), {
      relations: ['author'],
      select: ['id', 'postName', 'postDescription', 'language', 'created_at', 'updated_at'],
    });

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} not found.`, ['Post not found.']);
      return next(customError);
    }

    const sanitizedPost = {
      ...post,
      author: post.author ? {
        id: post.author.id,
        username: post.author.username,
        name: post.author.name
      } : null
    };

    res.customSuccess(200, 'Post found', sanitizedPost);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
