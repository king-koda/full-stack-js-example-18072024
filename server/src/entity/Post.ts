import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  content: string;

  // the value for order will auto-increment on insertion of a new post
  @Column({ type: "int" })
  @Generated("increment")
  order: number;

  @Column({ type: "timestamptz" })
  createdAt: Date;
}
