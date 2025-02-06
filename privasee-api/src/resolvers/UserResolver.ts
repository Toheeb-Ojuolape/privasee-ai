import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User, UserModel } from "../models/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await UserModel.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string, @Arg("email") email: string) {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return existingUser;
    }

    const user = new UserModel({ name, email });
    await user.save();
    return user;
  }
}
