import {MigrationInterface, QueryRunner} from "typeorm";

export class tesadeaweqw111231744025146381 implements MigrationInterface {
    name = 'tesadeaweqw111231744025146381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD "author_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_2f1a9ca8908fc8168bc18437f62" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_2f1a9ca8908fc8168bc18437f62"
        `);
        await queryRunner.query(`
            ALTER TABLE "post" DROP COLUMN "author_id"
        `);
    }

}
