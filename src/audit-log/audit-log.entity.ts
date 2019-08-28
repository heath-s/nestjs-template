import { Entity, Column, Index, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ default: '' })
  context: string;

  @Column('json', { nullable: true })
  error?: any;

  @Index()
  @Column({ default: '' })
  nickname: string;

  @Column('json')
  request: any;

  @Index()
  @Column({ default: '' })
  username: string;

  @Index()
  @Column('timestamp')
  createdAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }
}
