#![allow(dead_code)]

use crate::db::{connect, get_model_fields_information};
use rusqlite::ToSql;
use serde_json::{to_string, Value};

// Commands
const CREATE_TABLE: &str = "CREATE TABLE";
const CREATE_TABLE_IF: &str = "CREATE TABLE IF NOT EXISTS";
const INSERT_INTO: &str = "INSERT INTO";
const SELECT: &str = "SELECT";
const UPDATE: &str = "UPDATE";

// Arguments
const BASE_DB: &str = "main.db";
const VALUES: &str = "VALUES";
const FROM: &str = "FROM";
const SET: &str = "SET";

// TYPES
const INTEGER_PRIMARY_KEY: &str = "INTEGER PRIMARY KEY";
const TEXT: &str = "TEXT";
const INTEGER: &str = "INTEGER";
const NOT_NULL: &str = "NOT NULL";

fn create(mut model_data: Value) {
    let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
    let query = create_query(table, fields, fields_numbers);
    execute_query(query, fields_values);
}

fn create_query(table: String, fields: String, fields_numbers: String) -> String {
    return format!("INSERT INTO {table} ({fields}) VALUES ({fields_numbers});").to_string();
}

fn execute_query(query: String, fields_values: Vec<String>) -> i8 {
    let final_values: Vec<&dyn ToSql> = fields_values
        .iter()
        .map(|value| value as &dyn ToSql)
        .collect();

    connect().execute(&query, &final_values[..]).unwrap();
    return 0;
}

fn update(model_data: Value) {}

fn update_query(table: String, fields_names: String) -> String {
    return format!("UPDATE {table} SET {fields_names} WHERE id = ?");
}

fn read(model_data: Value) {
    let person_iter = stmt.query_map([], |row| {
        Ok(Person {
            id: row.get(0)?,
            name: row.get(1)?,
            data: row.get(2)?,
        })
    })?;
}

fn read_query(table: String) -> String {
    return format!("SELECT * FROM {table}");
}

fn delete(model_data: Value) {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_query() {
        let result = create_query(
            String::from("notes"),
            String::from("name, age"),
            String::from("1?, 2?"),
        );
        assert_eq!("INSERT INTO notes (name, age) VALUES (1?, 2?);", result);
    }
}
