# A NodeJS API to manage tasks

A API built using pure Node.js v20.10.0. It implements a file-based database, a stream service for adding multiple tasks and provides a CRUD (Create, Read, Update, Delete) functionality for managing the tasks.

## Features

- CRUD operations for managing tasks
- File-based database implementation
- A stream module for uploading multiple tasks through a csv file

## Requirements

- Node.js v20.10.0
- csv-parse library

## Usage

1. Clone this repository:

```sh
git clone https://github.com/DaniloNR/nodejs-task-manager.git
```

2. Navigate to the project directory:

```sh
cd nodejs-task-manager
```

3. Install dependencies:

```sh
pnpm i
```

4. Run the application:

```sh
pnpm run dev
```

## Endpoints

- **GET /tasks**: Get all tasks
- **GET /tasks?search={text}**: Get all tasks containing the the query string
- **GET /tasks/{id}**: Get task by ID
- **POST /tasks**: Create a new task
- **PUT /tasks/{id}**: Update task by ID
- **PATCH /tasks/{id}/complete**: Mark a specific task as complete
- **DELETE /tasks/{id}**: Delete task by ID

The server starts on [http://localhost:3333](http://localhost:3333)

## 📖 License

[MIT License](http://zenorocha.mit-license.org/) © Danilo Nogueira

## 🤝 Open Source

Feel free to clone this repo and use the way you want it!

I'm open to new ideas or suggestions, and I will try to implement those here.
