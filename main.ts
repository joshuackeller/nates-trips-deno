import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts";

const client = await new Client().connect({
  hostname: "project-3db.csuto9dkhygk.us-east-1.rds.amazonaws.com",
  username: "admin",
  password: "Password1!",
  db: "nate",
});

const select = `
  activity.id, activity.name, activity.description, activity.destinationId,
  destination.name as 'destinationName', destination.latitude, destination.longitude,
  picture.url
`;

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "hello there";
  })
  .get("/activities", async (context) => {
    try {
      const records = await client.query(
        `select ${select} from activity
        join destination on activity.destinationId=destination.id
        join picture on activity.id=picture.activityId`,
      );
      context.response.body = records;
    } catch (error) {
      context.response.body = {
        error,
      };
    }
  })
  .get("/activities/:id", async (context) => {
    try {
      const records = await client.query(
        `select ${select} from activity
        join destination on activity.destinationId=destination.id
        join picture on activity.id=picture.activityId
        where activity.id = ?`,
        [context?.params?.id],
      );
      context.response.body = records?.[0] || {};
    } catch (error) {
      context.response.body = {
        error,
      };
    }
  });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 4000 });
