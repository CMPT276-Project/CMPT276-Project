"use strict";

/*
    Creates an entry in the database for a new user with a supplied guid.

    Parameters:
        database (Database class):          Database class.
        guid:                               Randomly generated GUID to insert.
        success_callback(function(guid)):   A function to execute on success.
        failure_callback(function(err)):    A function to execute on failure.
*/
async function create_user(database, guid, success_callback, failure_callback) {
    const create_user_sql = `
        INSERT INTO users
            VALUES(?, ?);
    `;

    const create_score_sql = `
        INSERT INTO scores
            VALUES(?, ?);
    `;
    
    try {
        const create_user_statement = await database.run_statement(create_user_sql, guid, guid);
        create_user_statement.statement.reset();
        const create_score_statement = await database.run_statement(create_score_sql, guid, 0);
        create_score_statement.statement.reset();

        success_callback(guid);
    }
    catch(err) {
        failure_callback(err);
    }
}

/*
    Updates a user's record in database with a new name

    Parameters:
        database (Database class):          Database class.
        guid:                               GUID of user
        name:                               New name to update with
        success_callback(function()):       A function to execute on success.
        failure_callback(function(err)):    A function to execute on failure.
*/
async function update_user_name(database, guid, name, success_callback, failure_callback) {
    const sql = `
        UPDATE users
            SET name = ?
            WHERE id = ?;
    `;

    try {
        const { statement } = await database.run_statement(sql, name, guid);
        statement.reset();

        success_callback();
    }
    catch(err) {
        failure_callback(err);
    }
}

/*
    Returns the user record associated with supplied guid

    Parameters:
        database (Database class):          Database class.
        guid:                               GUID of user.
        success_callback(function(guid)):   A function to execute on success.
        failure_callback(function(err)):    A function to execute on failure.
*/
async function get_user(database, guid, success_callback, failure_callback) {
    const sql = `
        SELECT * 
            FROM users
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

export {
    create_user,
    update_user_name,
    get_user
}