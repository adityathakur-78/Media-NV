import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasks1768216080543 implements MigrationInterface {
    name = 'CreateTasks1768216080543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "descripton" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
