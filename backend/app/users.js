"use strict";

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