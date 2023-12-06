"use strict";

import { randomUUID } from "node:crypto";
import { Database } from "../app/database";
import { create_user, get_user, update_user_name } from "../app/users";
import { get_all_scores, get_score_for_user, update_user_score_by_amount } from "../app/scores";

const db_path = process.env.DB_PATH || "./testing.sqlite3";
const db = new Database(db_path);

const guid = randomUUID();
const name = "Taylor";
const score_current = 10;
const score_less = 1;
const score_more = 100;

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

    describe("Updating username", function () {
        test("Inserting into database", async function() {
            await update_user_name(db, guid, name,
                function() { },
                function(error) {
                    // TODO: Unsure what to test for this branch.
                }
            );
        });

        test("Checking if successfully inserted", async function() {
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


    describe("Updating user high score from 0", function() {
        test("Update score from 0", async function() {
            await update_user_score_by_amount(db, guid, score_current,
                function() { },
                function(error) {
                    // TODO: Unknown test case
                }
            );
        });

        test("Check if score was updated from 0", async function() {
            await get_score_for_user(db, guid, 
                function(score) {
                    expect(score).toBe(score_current);
                },
                function(error) {
                    // TODO: Unsure what to test for this branch
                }
            );
        });
    });

    describe("Update user high score - Score is less than stored", function() {
        test("Update with lower score than stored", async function() {
            await update_user_score_by_amount(db, guid, score_less,
                function() { },
                function(error) {
                    // TODO: Unsure what to test for this branch.
                }
            );
        });

        test("Check if score was NOT updated", async function() {
            await get_score_for_user(db, guid, 
                function(score) {
                    expect(score).toBe(score_current);
                },
                function(error) {
                    // TODO: Unsure what to test for this branch
                }
            );
        })
    });
    
    describe("Update user high score - Score is greater than stored", function() {
        test("Update with greater score than stored", async function() {
            await update_user_score_by_amount(db, guid, score_more,
                function() { },
                function(error) {
                    // TODO: Unsure what to test for this branch.
                }
            );
        });

        test("Check if score was updated.", async function() {
            await get_score_for_user(db, guid, 
                function(score) {
                    expect(score).toBe(score_more);
                },
                function(error) {
                    // TODO: Unsure what to test for this branch
                }
            );
        });
    });
});