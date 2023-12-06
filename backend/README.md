# What is this?

This repository contains the backend codebase for our scoring systems.

Presently (as of 2023 November 26) the feature list is stabilized and has been copied into our project monorepo.

# Prerequisites

- NodeJS and NPM (as of writing this document, `v18.18.2` and `9.8.1` respectively)

# Running

For production environments:

```bash
npm install
npm run migrate
npm start
```

For testing/development environments:

```bash
npm install
DB_PATH=./testing.sqlite3 npm run migrate
npm test
```

Testing scripts default to `./testing.sqlite3` instead of `./db.sqlite3` due to the potentially destructive nature of the database tests; by forcing different databases, we can prevent accidental data loss due to wrong command invocation.

# Howto

## Creating a user

To create a user send a GET request to `/api/v1/user/register`, you will receive a JSON payload containing a GUID. Internally, the database will store the GUIDs as the user's name as well.

## Changing the user's name

To change a user's name, send a POST request to `/api/v1/user/:guid`, where `:guid` is the GUID returned from sending a GET request`/api/v1/user/register`. The POST body should contain a JSON object with a single field: `name: name-to-set`.

## Getting a user's record

To get all data associated with a user, send a GET request to `/api/v1/user/:guid`, where `:guid` is the GUID returned from the GET request to `/api/v1/user/register`. The response's body contains a JSON object with the following fields: `id` and `name`.

## Get scoreboard

To get the scoreboard, send a GET request to `/api/v1/score`. The response will be an array of objects (each object has the keys: `name` and `score`) encoded as a JSON object.

## Get a user's score

To get a user's score, send a GET request to `/api/v1/score/:guid`, where `:guid` is the GUID of the user. The response will be a JSON object containing a single key, `score`.

## Update a user's score

To update a user's score, send a PATCH request to `/api/v1/score/:guid`, where `:guid` is the GUID of the user. The request body should contain a JSON object with a single key, `score`, and a integer value to update by.

If the submitted score is higher than what is stored, then the score in the database is updated with the submitted score. If the score is less or equal then it is discarded.

# Dependency Rationale

## Fastify

Fastify appears to be the replacement/alternative to Express as the latter has seen only a handful of commits (most of which seem to be dependency updates) for this year. 

Stable and well-maintained software is, in my opinion, fine with not receiving major version updates and only updating dependencies, but for something as potentially vulnerable as a web framework, it's safer to err on the side of caution and pick something that is more frequently updated instead.

## sqlite3

SQLite3 provides a relatively simple relational database that we can embed into our program's address space. It also has the added benefit of not requiring the end-user to bring up a dedicated SQL server.
