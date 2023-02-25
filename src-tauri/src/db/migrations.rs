use crate::db::connect;

pub fn run_migrations() -> i8 {
    create_initial_tables();
    return 0;
}

fn create_initial_tables() -> i8 {
    connect()
        .execute(
            "
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS kanban_tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pros_cons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL
        pros TEXT
        cons TEXT
    );
    ",
            [],
        )
        .unwrap();
    return 0;
}
