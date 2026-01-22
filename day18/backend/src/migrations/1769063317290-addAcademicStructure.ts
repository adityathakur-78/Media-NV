import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAcademicStructure1769063317290 implements MigrationInterface {
    name = 'AddAcademicStructure1769063317290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rollNo" integer NOT NULL, "userId" uuid, "classId" uuid, CONSTRAINT "REL_064d129936a1e821d637ee8c88" UNIQUE ("userId"), CONSTRAINT "PK_5ed0a32eeaddfe812fb326177d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_c30bc3401758faae4415391ea2" UNIQUE ("userId"), CONSTRAINT "PK_fdd17d62015e40674217a407484" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "marks" integer NOT NULL, "remarks" character varying, "studentId" uuid, "subjectId" uuid, "teacherId" uuid, CONSTRAINT "PK_051deeb008f7449216d568872c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher_profiles_subjects_subjects" ("teacherProfilesId" uuid NOT NULL, "subjectsId" uuid NOT NULL, CONSTRAINT "PK_a851d466682e0287ee869fa2da9" PRIMARY KEY ("teacherProfilesId", "subjectsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a40a204998f70755e59b85c702" ON "teacher_profiles_subjects_subjects" ("teacherProfilesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_212035465d643b68d6cb86b937" ON "teacher_profiles_subjects_subjects" ("subjectsId") `);
        await queryRunner.query(`CREATE TABLE "teacher_profiles_classes_classes" ("teacherProfilesId" uuid NOT NULL, "classesId" uuid NOT NULL, CONSTRAINT "PK_5d2b0379de299dd42ba79c6b90a" PRIMARY KEY ("teacherProfilesId", "classesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44f74e6c32795fa2715d613ca7" ON "teacher_profiles_classes_classes" ("teacherProfilesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2434cec165d17794b231684ee4" ON "teacher_profiles_classes_classes" ("classesId") `);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('TEACHER', 'STUDENT', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STUDENT'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "student_profiles" ADD CONSTRAINT "FK_064d129936a1e821d637ee8c88e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_profiles" ADD CONSTRAINT "FK_f4a055988449f89ea0292e726ee" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles" ADD CONSTRAINT "FK_c30bc3401758faae4415391ea23" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marks" ADD CONSTRAINT "FK_aa9e8312f7ce21846e5e2c3152a" FOREIGN KEY ("studentId") REFERENCES "student_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marks" ADD CONSTRAINT "FK_dc6d4d61c4c4492c00f20e2bf75" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marks" ADD CONSTRAINT "FK_1279bebcd08b0ca27adfef63fbf" FOREIGN KEY ("teacherId") REFERENCES "teacher_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles_subjects_subjects" ADD CONSTRAINT "FK_a40a204998f70755e59b85c7023" FOREIGN KEY ("teacherProfilesId") REFERENCES "teacher_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles_subjects_subjects" ADD CONSTRAINT "FK_212035465d643b68d6cb86b937e" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles_classes_classes" ADD CONSTRAINT "FK_44f74e6c32795fa2715d613ca74" FOREIGN KEY ("teacherProfilesId") REFERENCES "teacher_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles_classes_classes" ADD CONSTRAINT "FK_2434cec165d17794b231684ee4a" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_profiles_classes_classes" DROP CONSTRAINT "FK_2434cec165d17794b231684ee4a"`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles_classes_classes" DROP CONSTRAINT "FK_44f74e6c32795fa2715d613ca74"`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles_subjects_subjects" DROP CONSTRAINT "FK_212035465d643b68d6cb86b937e"`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles_subjects_subjects" DROP CONSTRAINT "FK_a40a204998f70755e59b85c7023"`);
        await queryRunner.query(`ALTER TABLE "marks" DROP CONSTRAINT "FK_1279bebcd08b0ca27adfef63fbf"`);
        await queryRunner.query(`ALTER TABLE "marks" DROP CONSTRAINT "FK_dc6d4d61c4c4492c00f20e2bf75"`);
        await queryRunner.query(`ALTER TABLE "marks" DROP CONSTRAINT "FK_aa9e8312f7ce21846e5e2c3152a"`);
        await queryRunner.query(`ALTER TABLE "teacher_profiles" DROP CONSTRAINT "FK_c30bc3401758faae4415391ea23"`);
        await queryRunner.query(`ALTER TABLE "student_profiles" DROP CONSTRAINT "FK_f4a055988449f89ea0292e726ee"`);
        await queryRunner.query(`ALTER TABLE "student_profiles" DROP CONSTRAINT "FK_064d129936a1e821d637ee8c88e"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('TEACHER', 'STUDENT', 'ADMIN,', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'STUDENT'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2434cec165d17794b231684ee4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44f74e6c32795fa2715d613ca7"`);
        await queryRunner.query(`DROP TABLE "teacher_profiles_classes_classes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_212035465d643b68d6cb86b937"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a40a204998f70755e59b85c702"`);
        await queryRunner.query(`DROP TABLE "teacher_profiles_subjects_subjects"`);
        await queryRunner.query(`DROP TABLE "marks"`);
        await queryRunner.query(`DROP TABLE "teacher_profiles"`);
        await queryRunner.query(`DROP TABLE "student_profiles"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
    }

}
