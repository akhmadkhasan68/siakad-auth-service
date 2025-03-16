import { setSeederFactory } from 'typeorm-extension';
import { User } from "../../src/databases/entities/user.entity";

export default setSeederFactory(User, (faker) => {
  const user = new User();

  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.secondaryEmail = faker.internet.email();
  user.phone = faker.string.numeric(
    '#############',
  );
  user.secondaryPhone = faker.string.numeric(
    '#############',
  );
  user.password = '123a123';
  user.isEmailVerified = true;
  user.emailVerifiedAt = new Date();
  user.isPhoneVerified = true;
  user.phoneVerifiedAt = new Date();
  user.referralCode = faker.string.alphanumeric(6);
  user.registeredAt = new Date();
  user.loggedFailedRetries = 0;
  user.isLocked = false;
  user.isDeactivated = false;

  return user;
});