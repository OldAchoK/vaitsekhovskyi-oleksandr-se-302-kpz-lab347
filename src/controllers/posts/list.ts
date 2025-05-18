import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  try {
    const posts = await postRepository.find({
      relations: ['author'],
      select: ['id', 'postName', 'postDescription', 'language', 'created_at', 'updated_at'],
    });

    const sanitizedPosts = posts.map(post => ({
      ...post,
      author: post.author ? {
        id: post.author.id,
        username: post.author.username,
        name: post.author.name
      } : null
    }));

    res.customSuccess(200, 'List of posts.', sanitizedPosts);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of posts.`, null, err);
    return next(customError);
  }
};
