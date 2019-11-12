import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ default: '' })
  context: string;

  @Column('simple-json', { nullable: true })
  error?: any;

  @Index()
  @Column({ default: '' })
  nickname: string;

  @Column('simple-json')
  request: any;

  @Index()
  @Column({ default: '' })
  username: string;

  @Index()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  createdAt: Date;
}
