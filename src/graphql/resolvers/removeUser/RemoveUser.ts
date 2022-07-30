import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../db/entity/user/User";

@Resolver()
export class RemoveUserResolver {
  @Mutation(() => Boolean)
  async removeUser(@Arg("id") id: number) {
    await User.delete(id);

    return true;
  }
}
