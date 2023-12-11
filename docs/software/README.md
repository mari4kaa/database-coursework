# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється:

## SQL-скрипт для створення та початкового наповнення бази даних

_structure.sql_
```sql
-- CreateEnum
CREATE TYPE "user_system_role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "project_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "participant_role" AS ENUM ('author', 'assignee', 'reviewer', 'participant');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(30) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "email" VARCHAR(40),
    "phone" VARCHAR(20),
    "avatar" VARCHAR(200),
    "system_role" "user_system_role" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(240) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sheduled_at" TIMESTAMP NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "user_id" INTEGER NOT NULL,
    "message_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "grants" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "project_id" INTEGER NOT NULL,
    "description" VARCHAR(500),
    "deadline" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "role" "participant_role" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")

CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "status" "project_status" NOT NULL DEFAULT 'inactive',
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "logo" VARCHAR(200),
    "description" VARCHAR(4000),

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "rule" VARCHAR(45) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "color" VARCHAR(15) NOT NULL,

    CONSTRAINT "labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "label_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(200) NOT NULL,
    "format" VARCHAR(15) NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "replied_to" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,
    "content" VARCHAR(1000) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_user_id_message_id_key" ON "notifications"("user_id", "message_id");

-- CreateIndex
CREATE UNIQUE INDEX "projects_title_key" ON "projects"("title");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_rule_key" ON "permissions"("rule");

-- CreateIndex
CREATE UNIQUE INDEX "grants_role_id_permission_id_key" ON "grants"("role_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "members_user_id_project_id_key" ON "members"("user_id", "project_id");

-- CreateIndex
CREATE INDEX "tasks_project_id_idx" ON "tasks"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "participants_member_id_task_id_key" ON "participants"("member_id", "task_id");

-- CreateIndex
CREATE UNIQUE INDEX "labels_name_key" ON "labels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_label_id_task_id_key" ON "tags"("label_id", "task_id");

-- CreateIndex
CREATE INDEX "attachments_task_id_idx" ON "attachments"("task_id");

-- CreateIndex
CREATE INDEX "reviews_task_id_idx" ON "reviews"("task_id");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grants" ADD CONSTRAINT "grants_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_replied_to_fkey" FOREIGN KEY ("replied_to") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

_seed.sql_
```sql
BEGIN;

INSERT INTO "users" ("login", "password", "phone", "email", "avatar", "system_role", "created_at", "updated_at")
VALUES
  ('Rubie_Zulauf', 'test1234', '9715010660', 'Rubie_Zulauf22@yahoo.com', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/206.jpg', 'user', '2023-09-12T22:01:21.430Z', '2023-10-17T20:26:28.535Z'),
  ('Lucile36', 'test1234', '4419198163', 'Lucile.Wolff63@hotmail.com', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/590.jpg', 'user', '2023-04-16T07:42:49.654Z', '2023-08-12T03:27:00.716Z'),
  ('Benjamin10', 'test1234', '8663409542', 'Benjamin.Stoltenberg34@yahoo.com', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/630.jpg', 'user', '2023-09-12T09:35:37.492Z', '2023-11-10T03:41:27.025Z'),
  ('Mckenna.Lubowitz', 'test1234', '6509283826', NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/874.jpg', 'user', '2023-07-08T08:18:11.106Z', '2023-10-24T18:08:20.400Z'),
  ('Jessica_Schmeler80', 'test1234', '9245290457', 'Jessica_Schmeler@gmail.com', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/7.jpg', 'user', '2023-07-12T08:25:43.545Z', '2023-10-30T14:49:46.755Z');

INSERT INTO "messages" ("content", "created_at", "sheduled_at")
VALUES
  ('Vado taceo aeger virtus verbera itaque. Aggredior ocer tremo somniculosus cras tantum. Cito vindico vilitas peior denique aspernatur.', '2023-04-28T08:13:42.378Z', '2023-10-19T05:27:49.093Z'),
  ('Somnus sufficio cursim blandior. Bestia textus quis cohors comburo pecco concedo. Distinctio conservo venustas angustus ara celebrer.', '2023-05-15T13:55:43.431Z', '2023-09-19T00:57:48.772Z'),
  ('Vestrum solium defetiscor civis quidem tamen. Vergo tricesimus celebrer bis eveniet. Charisma viriliter charisma cursus sapiente.', '2022-12-03T13:17:00.168Z', '2022-12-07T10:55:32.784Z'),
  ('Tenetur admoveo antiquus coerceo vitae tumultus. Auditor tredecim cibus. Conatus desolo attonbitus deleniti comptus tempore sustineo ater cura administratio.', '2023-07-27T02:48:21.767Z', '2023-10-16T23:37:07.711Z'),
  ('Mollitia voluptatum torrens tabesco alioqui taedium sonitus. Clementia collum crastinus vulticulus tubineus ratione quam argentum. Vere terminatio blandior teneo adicio utroque demitto uter urbs.', '2022-11-30T18:54:26.252Z', '2023-03-21T00:10:00.505Z');

INSERT INTO "notifications" ("user_id", "message_id")
VALUES
  (4, 4),
  (3, 2),
  (2, 3),
  (4, 5),
  (5, 1);

INSERT INTO "permissions" ("rule", "created_at")
VALUES
  ('CREATE PROJECT', '2022-01-01T00:00:00.000Z'),
  ('READ PROJECT', '2022-01-01T00:00:00.000Z'),
  ('UPDATE PROJECT', '2022-01-01T00:00:00.000Z'),
  ('DELETE PROJECT', '2022-01-01T00:00:00.000Z'),
  ('CREATE TASK', '2022-01-01T00:00:00.000Z'),
  ('READ TASK', '2022-01-01T00:00:00.000Z'),
  ('UPDATE TASK', '2022-01-01T00:00:00.000Z'),
  ('DELETE TASK', '2022-01-01T00:00:00.000Z'),
  ('CREATE COMMENT', '2022-01-01T00:00:00.000Z'),
  ('READ COMMENT', '2022-01-01T00:00:00.000Z'),
  ('UPDATE COMMENT', '2022-01-01T00:00:00.000Z'),
  ('DELETE COMMENT', '2022-01-01T00:00:00.000Z'),
  ('CREATE MEMBER', '2022-01-01T00:00:00.000Z'),
  ('UPDATE MEMBER', '2022-01-01T00:00:00.000Z'),
  ('DELETE MEMBER', '2022-01-01T00:00:00.000Z'),
  ('CREATE ROLE', '2022-01-01T00:00:00.000Z'),
  ('READ ROLE', '2022-01-01T00:00:00.000Z'),
  ('UPDATE ROLE', '2022-01-01T00:00:00.000Z'),
  ('DELETE ROLE', '2022-01-01T00:00:00.000Z');

INSERT INTO "roles" ("name")
VALUES
  ('manager'),
  ('member');

INSERT INTO "grants" ("role_id", "permission_id")
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10),
  (1, 11),
  (1, 12),
  (1, 13),
  (1, 14),
  (1, 15),
  (1, 16),
  (1, 17),
  (1, 18),
  (1, 19),
  (2, 2),
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 9),
  (2, 10),
  (2, 11),
  (2, 12);

INSERT INTO "projects" ("title", "status", "description", "logo", "start_date", "end_date", "created_at", "updated_at")
VALUES
  ('Bellum Speculum', 'inactive', 'Vir bestia arguo tendo varius. Et clementia vesco tyrannus subito cupiditas ambitus solutio voco tutis. Conservo hic damno animadverto arca.
Agnosco cibus comprehendo testimonium avaritia. Surgo harum contra. Dolorum unde adfero admiratio.', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/19.jpg', '2023-06-29T17:33:33.005Z', '2023-06-30T07:18:48.810Z', '2023-02-08T10:55:30.473Z', '2023-08-06T08:39:54.672Z'),
  ('Acer Angelus', 'inactive', NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/679.jpg', '2023-09-15T22:49:18.223Z', '2023-09-28T15:37:50.611Z', '2023-06-30T12:38:30.294Z', '2023-10-20T15:23:40.307Z'),
  ('Perferendis', 'active', NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1110.jpg', '2023-11-22T08:33:04.232Z', '2023-11-22T11:24:20.195Z', '2023-11-21T14:12:00.105Z', NULL),
  ('Dolorem', 'inactive', 'Vesica studio excepturi magnam consequuntur eius tantum cena arcus supellex. Vaco caveo tot versus vis. Conor cetera venia bonus ascisco pauci quam tribuo.
Architecto expedita solio caecus vivo una nam bellicus. Subito accendo arbor. Curtus cicuta quod claudeo arto averto.
Demoror esse inflammatio. Auctus supra libero synagoga crudelis arcus desolo soluta repellat. Accommodo varietas decens credo vinculum occaecati desolo desipio temptatio.
Inventore torrens virgo tum. Urbs arcesso unus averto comptus. Varius cuius acceptus.', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/996.jpg', '2023-08-16T05:12:24.540Z', '2023-11-19T05:47:10.034Z', '2023-07-25T07:35:16.877Z', '2023-09-05T14:19:54.585Z'),
  ('Ocer', 'active', NULL, 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/853.jpg', '2023-06-08T23:42:49.824Z', '2023-07-31T09:37:20.148Z', '2023-03-29T05:01:53.436Z', '2023-04-05T08:52:37.702Z');

INSERT INTO "members" ("user_id", "project_id", "role_id", "created_at", "updated_at")
VALUES
  (1, 1, 1, '2023-02-08T10:55:30.473Z', NULL),
  (1, 2, 1, '2023-06-30T12:38:30.294Z', NULL),
  (1, 3, 1, '2023-11-21T14:12:00.105Z', NULL),
  (3, 4, 1, '2023-07-25T07:35:16.877Z', NULL),
  (5, 5, 1, '2023-03-29T05:01:53.436Z', NULL),
  (5, 4, 2, '2023-08-04T22:23:01.047Z', '2023-10-20T20:57:54.811Z'),
  (3, 1, 2, '2023-02-18T05:38:08.025Z', NULL),
  (3, 5, 2, '2023-04-08T13:27:07.104Z', NULL),
  (4, 5, 2, '2023-03-31T07:05:05.204Z', NULL),
  (4, 1, 2, '2023-02-20T12:44:09.595Z', NULL);

INSERT INTO "tasks" ("title", "status", "project_id", "description", "deadline", "created_at", "updated_at")
VALUES
  ('Pauci averto culpa amitto', 'In progress', 4, NULL, '2023-11-12T03:47:19.412Z', '2023-11-07T17:22:54.979Z', '2023-11-14T10:44:27.158Z'),
  ('Assentator neque cunabula', 'Review', 5, NULL, '2023-11-04T23:13:29.890Z', '2023-08-27T10:16:46.349Z', '2023-09-01T04:19:34.335Z'),
  ('Curso utilis', 'Todo', 2, NULL, NULL, '2023-10-17T21:28:02.737Z', '2023-10-21T00:38:57.449Z'),
  ('Vereor inventore vorago provident', 'In progress', 4, NULL, '2023-10-13T22:28:39.018Z', '2023-08-09T19:13:15.597Z', '2023-10-15T21:11:45.356Z'),
  ('Asper absque amissio', 'Todo', 2, NULL, NULL, '2023-11-12T16:25:14.596Z', '2023-11-17T14:30:43.872Z');

INSERT INTO "labels" ("name", "color")
VALUES
  ('soleo', '#ee1eda'),
  ('strues viscus', '#1f1b0e'),
  ('stips', '#1043cc'),
  ('solitudo valens reprehenderit', '#a0c3b1'),
  ('corona', '#1cf63b');

INSERT INTO "tags" ("task_id", "label_id")
VALUES
  (3, 4),
  (5, 1),
  (2, 4),
  (3, 3),
  (1, 1);

INSERT INTO "attachments" ("task_id", "url", "format", "created_at")
VALUES
  (5, 'https://s3.amazonaws.com/bucket/c.mpeg', 'audio', '2023-11-12T16:25:14.596Z'),
  (4, 'https://s3.amazonaws.com/bucket/r.txt', 'text', '2023-08-09T19:13:15.597Z'),
  (4, 'https://s3.amazonaws.com/bucket/u.pdf', 'application', '2023-08-09T19:13:15.597Z'),
  (5, 'https://s3.amazonaws.com/bucket/K.jpeg', 'image', '2023-11-12T16:25:14.596Z'),
  (1, 'https://s3.amazonaws.com/bucket/m.txt', 'text', '2023-11-07T17:22:54.979Z');

INSERT INTO "participants" ("member_id", "task_id", "role", "created_at")
VALUES
  (2, 1, 'author', '2023-11-07T17:22:54.979Z'),
  (1, 2, 'author', '2023-08-27T10:16:46.349Z'),
  (6, 3, 'author', '2023-10-17T21:28:02.737Z'),
  (5, 4, 'author', '2023-08-09T19:13:15.597Z'),
  (10, 5, 'author', '2023-11-12T16:25:14.596Z'),
  (3, 2, 'assignee', '2023-08-28T10:57:59.560Z'),
  (6, 4, 'reviewer', '2023-08-14T14:30:45.315Z'),
  (5, 5, 'reviewer', '2023-11-17T00:37:28.685Z'),
  (9, 5, 'assignee', '2023-11-14T14:29:01.165Z'),
  (1, 1, 'reviewer', '2023-11-10T19:44:23.925Z');

INSERT INTO "reviews" ("participant_id", "task_id", "replied_to", "content", "created_at", "updated_at")
VALUES
  (5, 5, NULL, 'Tamdiu volup sollers contabesco tristis sapiente comburo charisma at. Coniecto volva labore qui cura. Dignissimos temeritas adeptio calamitas aiunt calcar trucido circumvenio.', '2023-11-12T16:25:14.596Z', NULL),
  (10, 5, NULL, 'Compello sub error succedo temperantia. Repudiandae esse vulgaris thymum sublime speciosus decumbo aggero cubitum. Confugo apostolus sollicito venia crux.
Varietas turbo alioqui. Tenus atqui xiphias collum strues. Cado consuasor natus.', '2023-11-12T16:25:14.596Z', NULL),
  (4, 2, NULL, 'Adsuesco adhaero delego fugiat bos pel. Spiculum censura adfectus terreo. Suadeo architecto stultus carus tabella blanditiis velit vesper territo veritatis.', '2023-08-27T10:16:46.349Z', NULL),
  (8, 2, NULL, 'Curatio cetera beatae dolorem caecus sequi vaco. Villa curo numquam. Dapifer aufero solitudo abbas condico auditor rem adstringo.
Omnis dicta aestivus eius. Tremo cur calamitas vorago casus spargo carpo aufero argumentum amplexus. Tricesimus subnecto titulus conforto cernuus decor benigne.', '2023-08-27T10:16:46.349Z', NULL),
  (2, 3, NULL, 'Enim cinis apparatus altus auctor laboriosam nobis debilito. Timidus vere calcar corroboro cupio adeptio. Vitiosus reiciendis nemo umquam autem damno.
Verecundia eaque volubilis dignissimos deleniti amor chirographum cuius dolorum. Peior sit averto sophismata ante commemoro aspicio uterque dignissimos. Supplanto tabesco coniuratio cetera conservo corrumpo cura.', '2023-10-17T21:28:02.737Z', NULL);

COMMIT;
```

_setup.sh_
```shell
psql -f install.sql -U postgres
psql -d versys -f ./structure.sql -U marcus
psql -d versys -f ./seed.sql -U marcus
psql -d versys -U marcus
```

## RESTfull сервіс для управління даними

### Схема бази даних
```typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model attachments {
  id         Int      @id @default(autoincrement())
  url        String   @db.VarChar(200)
  format     String   @db.VarChar(15)
  task_id    Int
  created_at DateTime @default(now()) @db.Timestamp(6)
  tasks      tasks    @relation(fields: [task_id], references: [id], onDelete: Cascade)

  @@index([task_id])
}

model grants {
  role_id       Int
  permission_id Int
  created_at    DateTime    @default(now()) @db.Timestamp(6)
  permissions   permissions @relation(fields: [permission_id], references: [id], onDelete: Cascade)
  roles         roles       @relation(fields: [role_id], references: [id], onDelete: Cascade)

  @@unique([role_id, permission_id])
}

model labels {
  id    Int    @id @default(autoincrement())
  name  String @unique @db.VarChar(30)
  color String @db.VarChar(15)
  tags  tags[]
}

model members {
  id           Int            @id @default(autoincrement())
  user_id      Int
  project_id   Int
  role_id      Int
  created_at   DateTime       @default(now()) @db.Timestamp(6)
  updated_at   DateTime?      @db.Timestamp(6)
  projects     projects       @relation(fields: [project_id], references: [id], onDelete: Cascade)
  roles        roles          @relation(fields: [role_id], references: [id])
  users        users          @relation(fields: [user_id], references: [id], onDelete: Cascade)
  participants participants[]

  @@unique([user_id, project_id])
}

model messages {
  id            Int             @id @default(autoincrement())
  content       String          @db.VarChar(240)
  created_at    DateTime        @default(now()) @db.Timestamp(6)
  sheduled_at   DateTime        @db.Timestamp(6)
  notifications notifications[]
}

model notifications {
  user_id    Int
  message_id Int
  messages   messages @relation(fields: [message_id], references: [id], onDelete: Cascade)
  users      users    @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@unique([user_id, message_id])
}

model participants {
  id         Int              @id @default(autoincrement())
  member_id  Int
  task_id    Int
  role       participant_role
  created_at DateTime         @default(now()) @db.Timestamp(6)
  members    members          @relation(fields: [member_id], references: [id], onDelete: Cascade)
  tasks      tasks            @relation(fields: [task_id], references: [id], onDelete: Cascade)
  reviews    reviews[]

  @@unique([member_id, task_id])
}

model permissions {
  id         Int      @id @default(autoincrement())
  rule       String   @unique @db.VarChar(45)
  created_at DateTime @default(now()) @db.Timestamp(6)
  grants     grants[]
}

model projects {
  id          Int            @id @default(autoincrement())
  title       String         @unique @db.VarChar(50)
  status      project_status @default(inactive)
  start_date  DateTime       @db.Timestamp(6)
  end_date    DateTime?      @db.Timestamp(6)
  created_at  DateTime       @default(now()) @db.Timestamp(6)
  updated_at  DateTime?      @db.Timestamp(6)
  logo        String?        @db.VarChar(200)
  description String?        @db.VarChar(4000)
  members     members[]
  tasks       tasks[]
}

model reviews {
  id             Int          @id @default(autoincrement())
  task_id        Int
  participant_id Int
  replied_to     Int?
  created_at     DateTime     @default(now()) @db.Timestamp(6)
  updated_at     DateTime?    @db.Timestamp(6)
  content        String       @db.VarChar(1000)
  participants   participants @relation(fields: [participant_id], references: [id], onDelete: Cascade)
  reviews        reviews?     @relation("reviewsToreviews", fields: [replied_to], references: [id], onDelete: Cascade)
  other_reviews  reviews[]    @relation("reviewsToreviews")
  tasks          tasks        @relation(fields: [task_id], references: [id], onDelete: Cascade)

  @@index([task_id])
}

model roles {
  id      Int       @id @default(autoincrement())
  name    String    @unique @db.VarChar(45)
  grants  grants[]
  members members[]
}

model tags {
  label_id Int
  task_id  Int
  labels   labels @relation(fields: [label_id], references: [id], onDelete: Cascade)
  tasks    tasks  @relation(fields: [task_id], references: [id], onDelete: Cascade)

  @@unique([label_id, task_id])
}

model tasks {
  id           Int            @id @default(autoincrement())
  title        String         @db.VarChar(50)
  status       String         @db.VarChar(50)
  project_id   Int
  description  String?        @db.VarChar(500)
  deadline     DateTime?      @db.Timestamp(6)
  created_at   DateTime       @default(now()) @db.Timestamp(6)
  updated_at   DateTime?      @db.Timestamp(6)
  attachments  attachments[]
  participants participants[]
  reviews      reviews[]
  tags         tags[]
  projects     projects       @relation(fields: [project_id], references: [id], onDelete: Cascade)

  @@index([project_id])
}

model users {
  id            Int              @id @default(autoincrement())
  login         String           @unique @db.VarChar(30)
  password      String           @db.VarChar(256)
  email         String?          @unique @db.VarChar(40)
  phone         String?          @unique @db.VarChar(20)
  avatar        String?          @db.VarChar(200)
  system_role   user_system_role
  created_at    DateTime         @default(now()) @db.Timestamp(6)
  updated_at    DateTime?        @db.Timestamp(6)
  members       members[]
  notifications notifications[]
}

enum participant_role {
  author
  assignee
  reviewer
  participant
}

enum project_status {
  active
  inactive
}

enum user_system_role {
  user
  admin
}
```
### Головний файл програми
```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
```
### Головний модуль програми
```typescript
import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProjectModule, UserModule, PrismaModule],
})
export class AppModule {}
```

### Валідатор IsUnique
```typescript
  import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';

interface IsUnique {
  entity: 'projects' | 'users';
  field: string;
}

export function IsUnique(
  options: IsUnique,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const prismaService = new PrismaService();

          const whereClause = {
            [options.field]: value,
          };

          const existingEntity = await (
            prismaService[options.entity] as any
          ).findUnique({
            where: whereClause,
          });

          if (existingEntity) {
            return false;
          }
          return true;
        },
        defaultMessage: ({ value }) =>
          `The ${options.field} "${value}" is not unique.`,
      },
    });
  };
}
```

### Модуль для контролю запитів до користувачів
```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### DTO для створення користувача
```typescript
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { user_system_role } from 'node_modules/.prisma/client/index';
import { IsUnique } from 'src/shared/validation/is-unique';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ entity: 'users', field: 'login' })
  @MaxLength(30)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  password: string;

  @IsOptional()
  @IsEmail()
  @IsUnique({ entity: 'users', field: 'email' })
  @MaxLength(40)
  email?: string;

  @IsOptional()
  @IsString()
  @IsUnique({ entity: 'users', field: 'phone' })
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  avatar?: string;

  @IsOptional()
  @IsEnum(user_system_role)
  system_role?: user_system_role;
}
```
### DTO для оновлення даних користувача
```typescript
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { user_system_role } from 'node_modules/.prisma/client/index';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  login?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  password?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(40)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  avatar?: string;

  @IsOptional()
  @IsEnum(user_system_role)
  system_role?: user_system_role;
}
```

### Контроллер запитів до користувачів
```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  create(@Body() dto: UserCreateDto) {
    return this.userService.create(dto);
  }

  @Get(':id')
  getSingleUser(@Param('id', ParseIntPipe) userId: number) {
    const user = this.userService.getSingleUser(userId);
    return user;
  }

  @Get()
  getAllUsers() {
    const users = this.userService.getAllUsers();
    return users;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UserUpdateDto,
  ) {
    return this.userService.update(userId, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
```
### Сервіс для обробки запитів до користувачів
```typescript
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserCreateDto, UserUpdateDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserCreateDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.users.create({
      data: {
        login: dto.login,
        password: hash,
        email: dto.email,
        phone: dto.phone,
        avatar: dto.avatar,
        system_role: dto.system_role,
      },
    });
    return user;
  }

  async getSingleUser(userId: number) {
    const user = await this.findUser(userId);
    const userProjects = await this.prisma.members.findMany({
      where: {
        user_id: userId,
      },
      select: {
        projects: true,
      },
    });
    user['projects'] = userProjects;
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.users.findMany();
    return users;
  }

  async update(userId: number, dto: UserUpdateDto) {
    try {
      await this.findUser(userId);
      const user = await this.updateUser(userId, dto);
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Some of fields are not unique');
        }
      }
    }
  }

  async delete(userId: number) {
    await this.findUser(userId);
    await this.prisma.users.delete({
      where: {
        id: userId,
      },
    });
    return 'User is successfully deleted';
  }

  private async findUser(userId: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('No such user');
    return user;
  }

  private async updateUser(userId: number, dto: UserUpdateDto) {
    if (dto.password) {
      dto.password = await argon.hash(dto.password);
    }
    const updUser = await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
        updated_at: new Date(),
      },
    });
    return updUser;
  }
}
```

### Модуль для контролю запитів до проєктів
```typescript
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
```

### DTO для створення проєкту
```typescript
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { project_status } from 'node_modules/.prisma/client/index';
import { IsUnique } from 'src/shared/validation/is-unique';

export class ProjectCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique({ entity: 'projects', field: 'title' })
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsEnum(project_status)
  status?: project_status;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;
}
```
### DTO для оновлення даних проєкту
```typescript
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { project_status } from 'node_modules/.prisma/client/index';

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsEnum(project_status)
  status?: project_status;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;
}
```

### Контроллер запитів до проєктів
```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectCreateDto, ProjectUpdateDto } from './dto';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  create(@Body() dto: ProjectCreateDto) {
    return this.projectService.create(dto);
  }

  @Get(':id')
  getSingleProject(@Param('id', ParseIntPipe) projectId: number) {
    const project = this.projectService.getSingleProject(projectId);
    return project;
  }

  @Get()
  getAllProjects() {
    const projects = this.projectService.getAllProjects();
    return projects;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: ProjectUpdateDto,
  ) {
    return this.projectService.update(projectId, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) projectId: number) {
    return this.projectService.delete(projectId);
  }
}
```
### Сервіс для обробки запитів до проєктів
```typescript
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDto, ProjectUpdateDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ProjectCreateDto) {
    const project = await this.prisma.projects.create({
      data: {
        title: dto.title,
        status: dto.status,
        start_date: dto.start_date ? new Date(dto.start_date) : null,
        end_date: dto.end_date ? new Date(dto.end_date) : null,
        logo: dto.logo,
        description: dto.description,
      },
    });
    return project;
  }

  async getSingleProject(projectId: number) {
    const project = await this.findProject(projectId);
    const projectMembers = await this.prisma.members.findMany({
      where: {
        project_id: projectId,
      },
      select: {
        users: true,
      },
    });
    project['users'] = projectMembers;
    return project;
  }

  async getAllProjects() {
    const projects = await this.prisma.projects.findMany();
    return projects;
  }

  async update(projectId: number, dto: ProjectUpdateDto) {
    try {
      await this.findProject(projectId);
      const updProject = await this.updateProject(projectId, dto);
      return updProject;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Title is not unique');
        }
      }
    }
  }

  async delete(projectId: number) {
    await this.findProject(projectId);
    await this.prisma.projects.delete({
      where: {
        id: projectId,
      },
    });
    return 'Project is successfully deleted';
  }

  private async findProject(projectId: number) {
    const project = await this.prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) throw new NotFoundException('No such project');

    return project;
  }

  private async updateProject(projectId: number, dto: ProjectUpdateDto) {
    const updProject = await this.prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        ...dto,
        updated_at: new Date(),
      },
    });
    return updProject;
  }
}
```
