use rusqlite::Connection;

pub fn connect() -> Connection {
    create_table();
    return Connection::open("main.db").unwrap();
}

pub fn create_table() -> i8 {
    let conn = Connection::open("main.db").unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )",
        [],
    )
    .unwrap();
    return 0;
}
