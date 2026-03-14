ALTER TABLE "customer"."auth_credentials" DROP CONSTRAINT "auth_credentials_user_id_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "customer"."customer_profiles" DROP CONSTRAINT "customer_profiles_user_id_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "customer"."google_auth" DROP CONSTRAINT "google_auth_user_id_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "customer"."auth_credentials" ADD COLUMN "customer_id" uuid PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "customer"."customer_profiles" ADD COLUMN "customer_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "customer"."google_auth" ADD COLUMN "customer_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "customer"."auth_credentials" ADD CONSTRAINT "auth_credentials_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"."customer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer"."customer_profiles" ADD CONSTRAINT "customer_profiles_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"."customer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer"."google_auth" ADD CONSTRAINT "google_auth_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"."customer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer"."auth_credentials" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "customer"."customer_profiles" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "customer"."google_auth" DROP COLUMN "user_id";