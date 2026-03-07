CREATE TABLE "client"."google_sign_in_clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"google_id" varchar(255) NOT NULL,
	"client_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "google_sign_in_clients_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
ALTER TABLE "client"."google_sign_in_clients" ADD CONSTRAINT "google_sign_in_clients_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "client"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "google_sign_in_client_google_id_unique" ON "client"."google_sign_in_clients" USING btree ("google_id");--> statement-breakpoint
CREATE INDEX "google_sign_in_client_client_id_index" ON "client"."google_sign_in_clients" USING btree ("client_id");