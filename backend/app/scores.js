"use strict";

/*
    Returns the score for a user using supplied GUID

    Parameters:
        database (Database class):          Database class.
        guid:                               GUID of user.
        success_callback(function(row)):    A function to execute on success.
        failure_callback(function(err)):    A function to execute on failure.
*/
async function get_score_for_user(database, guid, success_callback, failure_callback) {
    const sql = `
        SELECT score
            FROM scores
            WHERE id = ?;
    `;

    try {
        const { statement, row } = await database.get_statement(sql, guid);
        statement.reset();

        success_callback(row);
    }
    catch(err) {
        failure_callback(err);
    }
}

/*
    Returns the scores of all users

    Parameters:
        database (Database class):          Database class.
        success_callback(function(rows)):   A function to execute on success.
        failure_callback(function(err)):    A function to execute on failure.
*/
async function get_all_scores(database, success_callback, failure_callback) {
    const sql = `
        SELECT users.name, scores.score
            FROM scores
            INNER JOIN users ON users.id = scores.id;
    `;

    try {
        const { statement, rows } = await database.get_all_statement(sql);
        statement.reset();
        success_callback(rows);
    }
    catch(err) {
        failure_callback(err);
    }
}

/*
    Updates the score of a user using both the supplied guid and score parameters.

    Only updates if the new score is higher than the currently stored one.

    Parameters:
        database (Database class):          Database class.
        guid:                               GUID of user.
        score:                              New score to update with.
        success_callback(function(row)):    A function to execute on success.
        failure_callback(function(err)):    A function to execute on failure.
*/
async function update_user_score_by_amount(database, guid, score, success_callback, failure_callback) {
    const get_score_sql = `
        SELECT score
            FROM scores
            WHERE id = ?;
    `;

    const store_score_sql = `
        UPDATE scores
            SET score = ?
            WHERE id = ?;
    `;

    try {
        const get = await database.get_statement(get_score_sql, guid);
        get.statement.reset();

        if(score > get.row.score) {
            const store = await database.run_statement(store_score_sql, score, guid);
            store.statement.reset();
        }

        success_callback();
    }
    catch(err) {
        failure_callback(err);
    }
}

export {
    get_score_for_user,
    get_all_scores,
    update_user_score_by_amount
}
