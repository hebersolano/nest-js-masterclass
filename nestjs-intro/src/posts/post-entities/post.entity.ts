import { MetaOption } from 'src/meta-options/meta-option.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType, Status } from '../posts-types/create-post.enum';
import { User } from 'src/users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: PostType,
    default: PostType.post,
    nullable: false,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.draft,
    nullable: false,
  })
  status: Status;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp', // "datetime" in mysql
    nullable: true,
  })
  publishOn?: Date;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
  }) // relationship
  tags?: string[];

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
