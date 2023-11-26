"use strict";

import { randomUUID } from "node:crypto";
import { Database } from "../app/database";
import { create_user, get_user, update_user_name } from "../app/users";
import { get_all_scores, get_score_for_user, update_user_score_by_amount } from "../app/scores";

const db_path = process.env.DB_PATH || "./testing.sqlite3";
const db = new Database(db_path);

const guid = randomUUID();
const name = "Taylor";
const update_score = 10;

describe("Users", function() {
    test("Adding user to database", async function() {
        await create_user(db, guid, 
            function(id) {
                expect(id).toBe(guid);
            },
            function(error) {
                // TODO: Unsure what to test for this branch.
            }
        );
    });

    test("Update username", async function() {
        await update_user_name(db, guid, name,
            function() { },
            function(error) {
                // TODO: Unsure what to test for this branch.
            }
        );

        await get_user(db, guid,
            function(record) {
                expect(record.name).toBe(name);
            },
            function(error) {
                // TODO: Unsure what to test for this branch.
            }
        );
    });
});

describe("Scores", function() {
    test("Get user score", async function() {
        await get_score_for_user(db, guid,
            function(score) {
                expect(score).toBe(0);
            },
            function(error) {
                // TODO: Unsure what to test for this branch
            }
        );
    });

    test("Get all user scores", async function() {
        await get_all_scores(db,
            function(scores) {
                expect(scores)
                    .toContain({
                        name: name,
                        score: 0
                    });
            },
            function(error) {
                // TODO: Unsure what to test for this branch
            }
        );
    });

    test("Update user score", async function() {
        await update_user_score_by_amount(db, guid, update_score,
            function() { },
            function(error) {
                // TODO: Unsure what to test for this branch.
            }
        );

        await get_score_for_user(db, guid, 
            function(score) {
                expect(score).toBe(update_score);
            },
            function(error) {
                // TODO: Unsure what to test for this branch
            }
        );
    })
})