"use strict";

import { randomUUID } from "node:crypto";

import Fastify from "fastify";
import cors from "@fastify/cors";

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
    Description:
        On a call to this endpoint, generate, store, and return a GUID that represents the user.

    REST Method:
        GET
    
    Path:
        /api/v1/user/register

    Response Body:
        {
            "id": "guid"
        }
*/
fastify.get("/api/v1/user/register", async function(request, response) {
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

/*
    Description:
        Updates the username of a GUID in the database

    REST Method:
        POST
    
    Path:
        /api/v1/user/{guid}

    Request Body:
        {
            "name": "Name"
        }
*/
fastify.post("/api/v1/user/:guid", async function(request, response) {
    const guid = request.params["guid"];
    const name = request.body["name"];

    await update_user_name(database, guid, name, 
        function() { },
        function(error) {
            response.send(error);
        }
    );
});

/*
    Description:
        On a call to this endpoint, returns a user's record in database

    REST Method:
        GET
    
    Path:
        /api/v1/user/{guid}

    Response Body:
        {
            "id": "guid",
            "name": "name"
        }
*/
fastify.get("/api/v1/user/:guid", async function(request, response) {
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
    Description:
        On a call to this endpoint, returns a scoreboard 

    REST Method:
        GET
    
    Path:
        /api/v1/score

    Response Body:
        {
            [
                {
                    "name": "name",
                    "score": 123
                },
                ...
            ]
        }
*/
fastify.get("/api/v1/score", async function(request, response) {
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

/*
    Description:
        On a call to this endpoint, returns a user's current score

    REST Method:
        GET
    
    Path:
        /api/v1/score/{guid}

    Response Body:
        {
            "score": 123
        }
*/
fastify.get("/api/v1/score/:guid", async function(request, response) {
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

/*
    Description:
        On a call to this endpoint, updates a user's score if the score provided is larger than what is in the database.

    REST Method:
        PATCH
    
    Path:
        /api/v1/score/{guid}

    Request Body:
        {
            "score": 123
        }
*/
fastify.patch("/api/v1/score/:guid", async function(request, response) {
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
        await fastify.register(cors, {
            origin: "*",
            methods: ["GET", "POST", "PATCH"]
        });

        await fastify.listen({
            host: hostname,
            port: port
        });
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();
