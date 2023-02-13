use rusqlite::Connection;
use serde_json::Value;

// Commands
const CREATE_TABLE: &str = "CREATE TABLE";
const INSERT: &str = "INSERT INTO";
const SELECT: &str = "SELECT";
const FROM: &str = "FROM";

// Arguments
const BASE_DB: &str = "main.db";
const VALUES: &str = "VALUES";
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

fn update(model_data: Value) {}

fn read(model_data: Value) {}

fn delete(model_data: Value) {}

fn create(model_data: Value) {
    let table = &model_data["table"];
    let query = "
    CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER);
    INSERT INTO users VALUES ('Alice', 42);
    INSERT INTO users VALUES ('Bob', 69);
";
    connect().execute(query, ()).unwrap();
}

fn connect() -> Connection {
    return Connection::open(BASE_DB).unwrap();
}

fn create_table() -> String {
    return create_query(
        CREATE_TABLE,
        "users",
        "(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)",
    );
}

fn create_query(command: &str, table: &str, sql_arg: &str) -> String {
    // "INSERT INTO person (name, data) VALUES (?1, ?2)"
    // (&me.name, &me.data)
    let query = format!("{command} {table} () {sql_arg};").to_string();
    return query;
}

fn get_model() {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_query() {
        let result = create_query("INSERT INTO", "notes", "cool");
        assert_eq!("INSERT INTO notes () cool;", result);
    }
}
