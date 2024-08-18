import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableOtp1723986602560 implements MigrationInterface {
    name = 'AlterTableOtp1723986602560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "expiredAt"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "isExpired"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "verifiedAt"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_23ed6f04fe43066df08379fd034"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_9705bbbd12a28afdc0cdd4bdc0b" PRIMARY KEY ("user_id", "role_id", "id")`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "expired_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "is_expired" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "verified_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_9705bbbd12a28afdc0cdd4bdc0b"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY ("user_id", "role_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_23ed6f04fe43066df08379fd034"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_9705bbbd12a28afdc0cdd4bdc0b" PRIMARY KEY ("user_id", "role_id", "id")`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "is_verified"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "verified_at"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "is_expired"`);
        await queryRunner.query(`ALTER TABLE "otps" DROP COLUMN "expired_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_9705bbbd12a28afdc0cdd4bdc0b"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY ("user_id", "role_id")`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "verifiedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "isExpired" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "otps" ADD "expiredAt" TIMESTAMP`);
        await queryRunner.query(`CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id") `);
    }

}
