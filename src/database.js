import fs from "node:fs/promises";

const DATABASE_PATH = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
      .then(this.#loadDatabase.bind(this))
      .catch(this.#persist.bind(this));
  }

  select(table, search, ...args) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return args.some((key) => new RegExp(search, "i").test(row[key]));
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex === -1) throw new Error("Task not found");

    for (const key in data) {
      if (data[key] === null) continue;
      this.#database[table][rowIndex][key] = data[key];
    }

    this.#persist();
    return this.#database[table][rowIndex];
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  #loadDatabase(data) {
    this.#database = JSON.parse(data);
  }
}
