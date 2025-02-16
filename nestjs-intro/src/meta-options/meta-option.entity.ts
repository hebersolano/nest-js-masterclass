import { Post } from "src/posts/post-entities/post.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "simple-json", nullable: false })
  metaValue: string;

  @CreateDateColumn()
  createDate?: Date;
  @UpdateDateColumn()
  updateDate?: Date;

  @OneToOne(() => Post, (post) => post.metaOptions)
  post: Post;
}
