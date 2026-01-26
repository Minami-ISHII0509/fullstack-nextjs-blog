import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  // クリーンアップ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // 暗号化
  const hashedPassword = await bcrypt.hash("password123", 12);
  // ダミー画像
  const dummyImages = [
    "https://picsum.photos/seed/post1/600/400",
    "https://picsum.photos/seed/post2/600/400",
  ];

  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "test user",
      password: hashedPassword,
      posts: {
        create: [
          {
            title: "初めての投稿",
            content: "これは最初の投稿です。",
            topImage: dummyImages[0],
            published: true,
          },
          {
            title: "2つ目の投稿",
            content: "これは2つ目の投稿です。",
            topImage: dummyImages[1],
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
