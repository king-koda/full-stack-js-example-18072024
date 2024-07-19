import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "int", default: 0 })
  order: number;
}
