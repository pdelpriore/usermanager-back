import { IsEmail, MinLength } from "class-validator";
import { Args, ArgsType, Field, Mutation, Resolver } from "type-graphql";
import { User } from "../../../db/entity/user/User";

@ArgsType()
class EditUserArgs {
  @Field()
  id!: number;

  @IsEmail()
  @Field()
  email!: string;

  @MinLength(8)
  @Field()
  password!: string;
}

@Resolver()
export class EditUserResolver {
  @Mutation(() => Boolean)
  async editUser(@Args() { id, ...rest }: EditUserArgs) {
    await User.update({ id }, { ...rest });

    return true;
  }
}
