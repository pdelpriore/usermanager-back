import { Args, ArgsType, Field, Mutation, Resolver } from "type-graphql";
import { Chart } from "../../../db/entity/chart/Chart";
import { User } from "../../../db/entity/user/User";

@ArgsType()
class AddChartArgs {
  @Field()
  id!: number;

  @Field()
  stepNumber!: number;
}

@Resolver()
export class AddChartResolver {
  @Mutation(() => Boolean)
  async addChart(@Args() { id, stepNumber }: AddChartArgs) {
    const user = (await User.findOne({ where: { id } })) as User;

    const chart = Chart.create({ stepNumber, user });
    await chart.save();

    return true;
  }
}
