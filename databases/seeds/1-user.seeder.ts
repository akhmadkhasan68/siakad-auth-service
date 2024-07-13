import { User } from "../../src/databases/entities/user.entity";
import { Factory, Seeder } from "typeorm-seeding";

export default class UserSeeder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(10);
  }
}
