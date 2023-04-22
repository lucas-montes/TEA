use crate::db::connect;
use rusqlite::{Batch, Result};

use std::fs::File;
use std::io::BufReader;
use std::io::Read;

const CREATE_TABLE: &str = "CREATE TABLE IF NOT EXISTS";
const ADD_ID: &str = "id INTEGER PRIMARY KEY AUTOINCREMENT,";

pub fn run_migrations() -> i8 {
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

fn read_initial_migration() -> String {
    let file = File::open("./src/db/historial/initial.txt").unwrap();
    let mut buf_reader = BufReader::new(file);
    let mut contents = String::new();
    buf_reader.read_to_string(&mut contents);
    return contents;
}

fn create_initial_tables() -> Result<()> {
    let sql = &read_initial_migration();
    let conn = connect();
    let mut batch = Batch::new(&conn, sql);
    while let Some(mut stmt) = batch.next()? {
        stmt.execute([])?;
    }
    Ok(())
}
