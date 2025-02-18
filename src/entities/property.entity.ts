import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyFeature } from './propertyFeature.entity';
import { User } from './user.entity';
import { PropertyType } from './propertyType.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeature,
    (propertyFeature) => propertyFeature.property,
    { cascade: true },
  )
  propertyFeature: PropertyFeature;

  // Child entity we use many to one
  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'ownerId' })
  user: User;

  @ManyToOne(() => User, (user) => user.likedProperties)
  likedBy: User[];

  @ManyToOne(() => PropertyType)
  type: PropertyType;
}
