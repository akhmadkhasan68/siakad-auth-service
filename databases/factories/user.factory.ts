import { fakerID_ID as faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding'
import { User } from "../../src/databases/entities/user.entity";

define(User, () => {
    const user = new User();

    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.secondaryEmail = faker.internet.email();
    user.phone = faker.phone.number(
      '#############',
    );
    user.secondaryPhone = faker.phone.number(
      '#############',
    );
    user.password = '123a123';
    user.isEmailVerified = true;
    user.emailVerifiedAt = new Date();
    user.isPhoneVerified = true;
    user.phoneVerifiedAt = new Date();
    user.referralCode = faker.random.alphaNumeric(10);
    user.registeredAt = new Date();
    user.loggedFailedRetries = 0;
    user.isLocked = false;
    user.isDeactivated = false;

    return user;
  })
