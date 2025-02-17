import prisma from "@app-store/shared/utils/prisma";

export async function teardown() {
  return Promise.all([
    prisma.user.deleteMany({}),
    prisma.inviteCode.deleteMany({}),
    prisma.invitee.deleteMany({}),
  ]);
}
