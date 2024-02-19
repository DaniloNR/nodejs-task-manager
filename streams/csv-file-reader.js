import fs from "node:fs";
import { parse } from "csv-parse";

const CSV_PATH = new URL("./tasks-to-upload.csv", import.meta.url);

const stream = fs.createReadStream(CSV_PATH);

const parser = parse({
  delimiter: ",",
  fromLine: 2,
  skipEmptyLines: true,
});

async function processFile() {
  const tasks = stream.pipe(parser);

  for await (const [title, description] of tasks) {
    try {
      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }
}

processFile();
