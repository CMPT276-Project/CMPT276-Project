"use strict";

import sqlite from "sqlite3";

class Database {
    /*
        Database connection manager (explicitly not a comprehensive ORM) for SQLite.

        This function only executes commands and passes through results back to the caller.

        Arguments:
            db_path (String):   Path to an on-disk SQLite database.
    */
    constructor(db_path) {
        this.db_path = db_path;
        this.db = new sqlite.Database(db_path, sqlite.OPEN_READWRITE | sqlite.OPEN_FULLMUTEX);

        this.cache = {};
    }

    get_prepared_statement(sql) {
        return new Promise(function(resolve, reject) {
            if(this.cache[sql] === undefined) {
                const statement = this.db.prepare(sql, function(err) {
                    if(err !== null) {
                        reject(err);
                        return;
                    }
                });

                this.cache[sql] = statement;
            }

            resolve(this.cache[sql]);            
        }.bind(this));
    }

    run_statement(sql, ...parameters) {
        const promise = this.get_prepared_statement(sql)
            .then(function(statement) {
                return new Promise(function(resolve, reject) {
                    statement.run(...parameters, function(err) {
                        if(err !== null) {
                            reject(err);
                            return;
                        }
    
                        resolve({statement: statement});
                    });
                });
            });

        return promise;
    }

    get_statement(sql, ...parameters) {
        return this.get_prepared_statement(sql)
            .then(function(statement) {
                return new Promise(function(resolve, reject) {
                    statement.get(...parameters, function(err, row) {
                        if(err !== null) {
                            reject(err);
                            return;
                        }

                        resolve({statement: statement, row: row});
                    });
                });
            });
    }

    get_all_statement(sql, ...parameters) {
        return this.get_prepared_statement(sql)
            .then(function(statement) {
                return new Promise(function(resolve, reject) {
                    statement.all(...parameters, function(err, rows) {
                        if(err !== null) {
                            reject(err);
                            return;
                        }

                        resolve({statement: statement, rows: rows});
                    });
                });
            });
    }

    close() {
        this.db.close();
    }
}

export {
    Database
};