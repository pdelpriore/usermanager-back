import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Chart } from "../chart/Chart";
import { AdminProfile } from "../profile/AdminProfile";
import { UserProfile } from "../profile/UserProfile";

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @Column({ type: "enum", enum: UserType, default: UserType.USER })
  type!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => AdminProfile, { nullable: true })
  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user)
  @JoinColumn({ name: "adminProfileId" })
  adminProfile?: AdminProfile;

  @Field(() => UserProfile, { nullable: true })
  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  @JoinColumn({ name: "userProfileId" })
  userProfile?: UserProfile;

  @Field(() => [Chart], { nullable: true })
  @OneToMany(() => Chart, (chart) => chart.user)
  charts?: Chart[];
}
