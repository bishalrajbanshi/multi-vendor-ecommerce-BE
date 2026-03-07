ALTER TABLE "client"."google_oauth" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "client"."google_oauth" CASCADE;--> statement-breakpoint
ALTER TABLE "client"."clients" ADD COLUMN "google_id" varchar(255);--> statement-breakpoint
ALTER TABLE "client"."clients" ADD CONSTRAINT "clients_google_id_unique" UNIQUE("google_id");