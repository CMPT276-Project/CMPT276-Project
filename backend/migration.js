"use strict";

import { createContext, runInContext } from "node:vm";
import { readdirSync, readFileSync } from "fs";

import sqlite3 from "sqlite3";

const migrations_path = "./migrations";
const db_path =  process.env.DB_PATH || "./db.sqlite3";

/*
    From this script, we use NodeJS's built in VM functions to call other scripts to declare our SQLite schema.

    This JS object is used to create a context that each script can call to execute DDL.
*/
const vm_context = {
    db: new sqlite3.Database(db_path)
};
createContext(vm_context);

/*
    It is IMPORTANT/IMPERATIVE/OTHER-SPOOKY-WORDS that the filename is in the following format:
        {YEAR}{MONTH}{DATE}-{HOUR}{MINUTE}{SECOND}.js

    For example: 
        20231119-045204.js
*/
const files = readdirSync(migrations_path);

/* 
    Sort the migrations based on timestamp embedded in filename, as Git does not preserve file creation, 
    or modification times; certain filesystems may also not preserve some of these attributes such as ZFS
    with 'atime=off'.

    Refer to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    regarding how the anonymous compare function works.

    TL;DR:
        If the function returns < 0 then 'a' is before 'b'
                                > 0 then 'a' is after 'b'
                                === 0 then 'a' and 'b' preserve the original order.
 */
files.sort();

for(let file of files) {
    // Check if Javascript source file
    if (file.split(".").pop() !== "js") {
        console.log(`Skipping ${file}`);
        continue;
    }

    const script = readFileSync(migrations_path + "/" + file, "utf8");
    runInContext(script, vm_context);
}