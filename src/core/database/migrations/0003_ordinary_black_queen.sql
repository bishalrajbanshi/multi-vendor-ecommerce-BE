CREATE SCHEMA "user";
--> statement-breakpoint
CREATE TABLE "user"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255),
	"phone" varchar(20),
	"isGoogleAuth" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "user"."authCredentials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"password" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "authCredentials_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "user"."googleAuth" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"googleId" varchar(255) NOT NULL,
	CONSTRAINT "googleAuth_userId_unique" UNIQUE("userId"),
	CONSTRAINT "googleAuth_googleId_unique" UNIQUE("googleId")
);
--> statement-breakpoint
ALTER TABLE "user"."authCredentials" ADD CONSTRAINT "authCredentials_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user"."googleAuth" ADD CONSTRAINT "googleAuth_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE cascade ON UPDATE no action;