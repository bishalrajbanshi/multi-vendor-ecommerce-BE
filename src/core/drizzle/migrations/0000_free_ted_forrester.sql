CREATE SCHEMA "users";
--> statement-breakpoint
CREATE TABLE "users"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(6) NOT NULL
);
