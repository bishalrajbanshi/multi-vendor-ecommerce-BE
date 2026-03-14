ALTER TABLE "customer"."customer_profiles" RENAME COLUMN "last_name" TO "full_name";--> statement-breakpoint
ALTER TABLE "customer"."customer_profiles" DROP COLUMN "first_name";