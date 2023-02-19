use rusqlite::Connection;
use serde_json::{json, to_string, Value};

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

pub fn get_model_details(model_data: Value) {
    let table = get_table(model_data);
}

fn get_table(model_data: Value) -> String {
    return model_data
        .as_object_mut()
        .unwrap()
        .remove("table")
        .unwrap()
        .to_string();
}

fn get_model_fields_information(model_data: Value) -> (String, String, Vec<String>) {
    let mut fields: String = String::from("");
    let mut fields_numbers: String = String::from("");
    let mut fields_values: Vec<String> = Vec::new();
    let mut number_field: i8 = 0;

    // When iterating it seems that the object from serde it's sorted
    for (key, value) in model_data.as_object().unwrap() {
        fields = generate_fields(fields.to_string(), key.to_string());

        number_field += 1;
        fields_numbers = generate_fields(
            fields_numbers.to_string(),
            format!("{number_field}?").to_string(),
        );

        fields_values.push(value.as_str().unwrap().to_string());
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_model_fields_information() {
        let model_data = json!({ "title": "name", "id": "5"});
        let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
        assert_eq!("id, title", fields);
        assert_eq!("1?, 2?", fields_numbers);
        assert_eq!(vec!("5", "title"), fields_values);
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
