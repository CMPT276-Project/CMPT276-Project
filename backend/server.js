"use strict";

import { randomUUID } from "node:crypto";

import Fastify from "fastify";

import { Database } from "./app/database.js";
import { create_user, update_user_name, get_user } from "./app/users.js";
import { get_score_for_user, get_all_scores, update_user_score_by_amount } from "./app/scores.js";

const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;
const db_path = process.env.DB_PATH || "./db.sqlite3";

const fastify = Fastify({
    logger: true
});

const database = new Database(db_path);

/* 
    Routings - User Management
*/

// Generate, store, and return a GUID
fastify.get("/api/v1/user/register", async function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Method", "GET");

    await create_user(database, randomUUID(), 
        function(guid) {
            response.send({
                id: guid
            })
        }, 
        function(error) {
            response.send(error);
        }
    );
});

// Update a user's name
fastify.post("/api/v1/user/:guid", async function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Method", "POST");

    const guid = request.params["guid"];
    const name = request.body["name"];

    await update_user_name(database, guid, name, 
        function() { },
        function(error) {
            response.send(error);
        }
    );
});

// Get a user's record
fastify.get("/api/v1/user/:guid", async function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Method", "GET");

    const guid = request.params["guid"];

    await get_user(database, guid,
        function(record) {
            response.send(record);
        },
        function(error) {
            response.send(error);
        }
    )
})

/*
    Routings - Score Management
*/

// Get all scores
fastify.get("/api/v1/score", async function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Method", "GET");

    await get_all_scores(database, 
        function(scores) {
            response.send(scores);
        },
        function(error) {
            response.send({
                error: error
            });
        }
    )
})

// Get user's current score
fastify.get("/api/v1/score/:guid", async function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Method", "GET");

    const guid = request.params["guid"];

    await get_score_for_user(database, guid,
        function(score) {
            response.send(score);
        },
        function(error) {
            response.send({
                error: error
            });
        }
    );
});

// Update a user's score
fastify.patch("/api/v1/score/:guid", async function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Method", "PATCH");

    const guid = request.params["guid"];
    const update_by_amount = request.body["score"];

    await update_user_score_by_amount(
        database,
        guid,
        update_by_amount,
        function() { },
        function(error) {
            response.send({
                error: error
            })
        }
    )
});


// Start the server
const start = async function() {
    try {
        await fastify.listen({
            host: hostname,
            port: port
        });
    }
    catch (error) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
