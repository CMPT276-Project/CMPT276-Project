db.serialize(function() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id TEXT,
        name TEXT UNIQUE,

        PRIMARY KEY(id)
    );

    CREATE TABLE IF NOT EXISTS scores(
        id TEXT,
        score INTEGER,

        PRIMARY KEY(id),

        FOREIGN KEY(id)
            REFERENCES users(id)
            ON DELETE CASCADE
    );
`)});
