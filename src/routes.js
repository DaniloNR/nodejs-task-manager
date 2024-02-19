import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = {
  GET: [
    {
      path: buildRoutePath("/tasks"),
      handler: (req, res) => {
        const { search = null } = req.query;

        const tasks = database.select("tasks", search, "title", "description");

        return res.end(JSON.stringify(tasks));
      },
    },
  ],
  POST: [
    {
      path: buildRoutePath("/tasks"),
      handler: (req, res) => {
        const { title, description } = req.body;

        const task = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        database.insert("tasks", task);

        return res.writeHead(201).end();
      },
    },
  ],
  PUT: [
    {
      path: buildRoutePath("/tasks/:id"),
      handler: (
        { params: { id }, body: { title = null, description = null } },
        res
      ) => {
        try {
          database.update("tasks", id, {
            title,
            description,
            updated_at: new Date().toISOString(),
          });

          return res.writeHead(204).end();
        } catch (error) {
          return res.writeHead(404).end(String(error));
        }
      },
    },
  ],
  PATCH: [
    {
      path: buildRoutePath("/tasks/:id/complete"),
      handler: ({ params: { id } }, res) => {
        try {
          database.update("tasks", id, {
            completed_at: new Date().toISOString(),
          });
          return res.writeHead(204).end();
        } catch (error) {
          return res.writeHead(404).end(String(error));
        }
      },
    },
  ],
  DELETE: [
    {
      path: buildRoutePath("/tasks/:id"),
      handler: ({ params: { id } }, res) => {
        try {
          database.delete("tasks", id);
          return res.writeHead(204).end();
        } catch (error) {
          return res.writeHead(404).end(String(error));
        }
      },
    },
  ],
};
