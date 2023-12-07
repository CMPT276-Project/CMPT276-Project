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

    /*
        Returns a cached prepared statement, if a cached statement does not exist, then one is generated, stored, and returned.
        
        NOTE: Do not close the statement as other connections may be using it.
        NOTE: Make sure to reset the cursor position when done, this can be done by calling the reset() function on the statement.

        For further reading:
            - https://stackoverflow.com/questions/1703203/in-sqlite-do-prepared-statements-really-improve-performance

        Arguments:
            sql (String):   The SQL DML to execute.

        Returns:
            A Promise that contains the cached prepared statement.
    */
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

    /*
        Runs a given SQL DML with given parameters. 

        Internally, it calls get_prepared_statement to improve performnace.

        Arguments:
            sql (String):                                   The SQL DML to execute
            parameters (Variable length array of any type): Paramters to pass into prepared statement

        Returns:
            A Promise that returns the statement if the DML was successfully executed, returns an error if it does not.
    */
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

    /*
        Gets a single row given a SQL DML and given parameters. 

        Internally, it calls get_prepared_statement to improve performnace.

        Arguments:
            sql (String):                                   The SQL DML to execute
            parameters (Variable length array of any type): Paramters to pass into prepared statement

        Returns:
            A Promise that returns the statement and row if the DML was successfully executed, returns an error if it does not.
    */
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

    /*
        Gets all rows given a SQL DML and given parameters. 

        Internally, it calls get_prepared_statement to improve performnace.

        Arguments:
            sql (String):                                   The SQL DML to execute
            parameters (Variable length array of any type): Paramters to pass into prepared statement

        Returns:
            A Promise that returns the statement and rows if the DML was successfully executed, returns an error if it does not.
    */
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