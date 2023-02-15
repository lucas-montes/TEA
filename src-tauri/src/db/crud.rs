#![allow(dead_code)]

use rusqlite::Connection;
use serde_json::{from_str, to_string, Value};

// Commands
const CREATE_TABLE: &str = "CREATE TABLE";
const CREATE_TABLE_IF: &str = "CREATE TABLE IF NOT EXISTS";
const INSERT_INTO: &str = "INSERT INTO";
const SELECT: &str = "SELECT";

// Arguments
const BASE_DB: &str = "main.db";
const VALUES: &str = "VALUES";
const FROM: &str = "FROM";

// TYPES
const INTEGER_PRIMARY_KEY: &str = "INTEGER PRIMARY KEY";
const TEXT: &str = "TEXT";
const INTEGER: &str = "INTEGER";
const NOT_NULL: &str = "NOT NULL";

pub fn handle_methods(method_name: &str, model_data: Value) {
    let callable_method = match method_name {
        "create" => create,
        "update" => update,
        "read" => read,
        "delete" => delete,
        &_ => todo!(),
    };
    return callable_method(model_data);
}

fn create(mut model_data: Value) {
    let table = model_data
        .as_object_mut()
        .unwrap()
        .remove("table")
        .unwrap()
        .to_string();
    let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
    let query = create_query(INSERT_INTO, table, fields, VALUES, fields_numbers);
    // connect().execute(query, fields_values).unwrap();
}

fn get_model_fields_information(model_data: Value) -> (String, String, Vec<String>) {
    let mut fields: String = String::from("");
    let mut fields_numbers: String = String::from("");
    let mut fields_values: Vec<String> = Vec::new();
    let mut number_field: i8 = 0;

    for (key, value) in model_data.as_object().unwrap() {
        fields = generate_fields(fields.to_string(), key.to_string());

        number_field += 1;
        fields_numbers = generate_fields(
            fields_numbers.to_string(),
            format!("{number_field}").to_string(),
        );

        fields_values.push(to_string(&value).unwrap());
    }
    return (fields, fields_numbers, fields_values);
}

fn generate_fields(fields: String, new_field: String) -> String {
    let fields_str: String;

    if fields.is_empty() {
        fields_str = format!("{}", new_field);
    } else {
        fields_str = format!("{}, {}", fields, new_field);
    }

    return fields_str;
}

fn create_query(
    command: &str,
    table: String,
    fields: String,
    sql_arg: &str,
    fields_numbers: String,
) -> String {
    return format!("{command} {table} ({fields}) {sql_arg} ({fields_numbers});").to_string();
}

fn connect() -> Connection {
    return Connection::open(BASE_DB).unwrap();
}

fn update(model_data: Value) {}

fn read(model_data: Value) {}

fn delete(model_data: Value) {}

fn create_table() -> String {
    return String::new();
    // return create_query(
    //     CREATE_TABLE,
    //     "users",
    //     "(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)",
    // );
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_query() {
        let result = create_query(
            "INSERT INTO",
            String::from("notes"),
            String::from("name, age"),
            "VALUES",
            String::from("1?, 2?"),
        );
        assert_eq!("INSERT INTO notes (name, age) VALUES (1?, 2?);", result);
    }

    #[test]
    fn test_get_model_fields_information() {
        let model_data = from_str("{'title':'name', 'id':'5'}").unwrap();
        let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
        assert_eq!("title, id", fields);
        assert_eq!("1?, 2?", fields_numbers);
        assert_eq!(vec!("name", "id"), fields_values);
    }

    #[test]
    fn test_generate_fields() {
        let mut result = String::from("");
        for word in ["one", "two", "three"] {
            result = generate_fields(result, String::from(word));
        }
        assert_eq!("one, two, three", result);
    }
}
