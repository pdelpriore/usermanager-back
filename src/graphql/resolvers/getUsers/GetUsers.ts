import { Field, ObjectType, Query, Resolver } from "type-graphql";
import { User, UserType } from "../../../db/entity/user/User";

@ObjectType()
class Users {
  @Field(() => [User])
  admins!: User[];

  @Field(() => [User])
  users!: User[];
}

@Resolver()
export class getUsersResolver {
  @Query(() => Users)
  async getUsers() {
    const admins = await User.find({
      where: { type: UserType.ADMIN },
      relations: ["adminProfile", "charts"],
    });

    const users = await User.find({
      where: { type: UserType.USER },
      relations: ["userProfile", "charts"],
    });

    return { admins, users };
  }
}
