CREATE TABLE "auth"."superAdmins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255),
	"phone" varchar(20),
	"password" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'superadmin' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "superAdmins_email_unique" UNIQUE("email"),
	CONSTRAINT "superAdmins_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "auth"."vendors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(20),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vendors_email_unique" UNIQUE("email"),
	CONSTRAINT "vendors_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DROP TABLE "geography"."city" CASCADE;--> statement-breakpoint
DROP TABLE "geography"."country" CASCADE;--> statement-breakpoint
DROP TABLE "geography"."state" CASCADE;--> statement-breakpoint
DROP TABLE "geography"."zone" CASCADE;--> statement-breakpoint
ALTER TABLE "auth"."permissions" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."permissions" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."roles" ADD COLUMN "isSystem" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."roles" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."roles" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."permissions" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "auth"."permissions" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "auth"."roles" DROP COLUMN "is_system";--> statement-breakpoint
ALTER TABLE "auth"."roles" DROP COLUMN "deleted";--> statement-breakpoint
ALTER TABLE "auth"."roles" DROP COLUMN "deleted_at";--> statement-breakpoint
ALTER TABLE "auth"."roles" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "auth"."roles" DROP COLUMN "updated_at";--> statement-breakpoint
DROP SCHEMA "geography";
