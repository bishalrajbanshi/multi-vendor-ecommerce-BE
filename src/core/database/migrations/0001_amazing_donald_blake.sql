DROP INDEX "auth"."role_permission_unique";--> statement-breakpoint
CREATE INDEX "email_index" ON "customer"."customer" USING btree ("email");--> statement-breakpoint
CREATE INDEX "phone_index" ON "customer"."customer" USING btree ("phone");