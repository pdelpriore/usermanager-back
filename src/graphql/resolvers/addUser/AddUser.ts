import { IsEmail, MinLength } from "class-validator";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { AdminProfile } from "../../../db/entity/profile/AdminProfile";
import { UserProfile } from "../../../db/entity/profile/UserProfile";
import { User, UserType } from "../../../db/entity/user/User";

@InputType()
class UserInputType {
  @IsEmail()
  @Field()
  email!: string;

  @MinLength(8)
  @Field()
  password!: string;

  @Field()
  type!: string;
}

@InputType()
class AdminProfileInputType {
  @MinLength(3)
  @Field()
  login!: string;
}

@InputType()
class UserProfileInputType {
  @MinLength(3)
  @Field()
  firstName!: string;

  @MinLength(3)
  @Field()
  lastName!: string;
}

@Resolver()
export class AddUserResolver {
  @Mutation(() => Boolean)
  async addUser(
    @Arg("userInput", () => UserInputType) userInput: UserInputType,
    @Arg("adminProfileInput", () => AdminProfileInputType, { nullable: true })
    adminProfileInput?: AdminProfileInputType,
    @Arg("userProfileInput", () => UserProfileInputType, { nullable: true })
    userProfileInput?: UserProfileInputType
  ) {
    const profileName =
      userInput.type === UserType.ADMIN ? "adminProfile" : "userProfile";

    const profile =
      userInput.type === UserType.ADMIN
        ? AdminProfile.create({
            ...adminProfileInput,
          })
        : UserProfile.create({
            ...userProfileInput,
          });

    await profile.save();

    const user = User.create({
      ...userInput,
      [profileName]: profile,
    });

    await user.save();

    return true;
  }
}
