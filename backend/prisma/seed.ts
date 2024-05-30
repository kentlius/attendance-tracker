import { AttendanceStatus, PrismaClient, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

const prisma = new PrismaClient();

async function main() {
  const userAdmin = {
    id: generateId(15),
    username: "user",
    password: await new Argon2id().hash("user123"),
  };

  const userHR = {
    id: generateId(15),
    username: "hrd",
    password: await new Argon2id().hash("hrd123"),
    role: UserRole.HR,
  };

  await prisma.user.createMany({
    data: await Promise.all([userAdmin, userHR]),
  });

  const users = Array.from({ length: 10 }, async () => ({
    id: generateId(15),
    username: faker.internet.userName(),
    password: await new Argon2id().hash(faker.internet.password()),
  }));

  const generatedUsers = await prisma.user.createManyAndReturn({
    select: { id: true },
    data: await Promise.all(users),
    skipDuplicates: true,
  });

  const employees = generatedUsers.map((user) => ({
    userId: user.id,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }));

  const generatedEmployees = await prisma.employee.createManyAndReturn({
    select: { id: true },
    data: employees,
  });

  const attendances = generatedEmployees.flatMap((employee) =>
    Array.from({ length: 20 }, () => ({
      employeeId: employee.id,
      imageUrl: faker.image.urlLoremFlickr({ category: "people" }),
      status: AttendanceStatus.ON_TIME,
      loggedAt: faker.date.recent({ days: 1 }),
    }))
  );

  await prisma.attendanceRecord.createMany({
    data: attendances,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
