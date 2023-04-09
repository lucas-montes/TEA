use crate::db::connect;
use rusqlite::{Batch, Result};

const CREATE_TABLE: &str = "CREATE TABLE IF NOT EXISTS";
const ADD_ID: &str = "id INTEGER PRIMARY KEY AUTOINCREMENT,";

pub fn run_migrations() -> i8 {
    println!("Running migrations");
    let initial_tables_result = create_initial_tables();
    let _resut = match initial_tables_result {
        Ok(_result) => return 1,
        Err(error) => panic!("Problem with migrations: {:?}", error),
    };
}

//fn create_table(table_name: &str) -> String {
//    return format!(
//        "{CREATE_TABLE} {table_name} (
//        {ADD_ID}
//
//            )",
//        );
//}
//
//fn create_row(row_name: &str, row_type: &str,  last_row: bool) -> String {
//    let is_last_row: &str = if last_row {","}else {""};
//    return format!("{row_name} {row_type} {is_last_row}")
//}

fn create_initial_tables() -> Result<()> {
    let sql = "
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        project_id INTEGER NOT NULL,
        FOREIGN KEY(project_id) REFERENCES projects(id)
    );
    CREATE TABLE IF NOT EXISTS proscons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        pros TEXT,
        cons TEXT
    );
    ";
    let conn = connect();
    let mut batch = Batch::new(&conn, sql);

    while let Some(mut stmt) = batch.next()? {
        stmt.execute([])?;
    }
    Ok(())
}
