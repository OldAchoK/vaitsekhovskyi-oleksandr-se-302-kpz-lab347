import bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { Language } from './types';
import { User } from '../users/User';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'post_name',
    default: false,
    nullable: false,
    length: 100,
  })
  postName: string;

  @ManyToOne(type => User, user => user.posts)
  author: User;

  @Column({
    name: 'post_description',
    nullable: false,
    unique: false,
    length: 255,
  })
  postDescription: string;

  @Column({
    default: 'en-US' as Language,
    length: 15,
  })
  language: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  setLanguage(language: Language) {
    this.language = language;
  }
}
