use chrono::NaiveDateTime;
use rusqlite::Connection;
use serde_json::Value;

pub fn connect() -> Connection {
    return Connection::open("tea.db").unwrap();
}

pub fn get_model_fields_information(model_data: Value) -> (String, String, Vec<String>) {
    let mut fields: String = String::from("");
    let mut fields_numbers: String = String::from("");
    let mut fields_values: Vec<String> = Vec::new();
    // When iterating it seems that the object from serde it's sorted
    for (key, value) in model_data.as_object().unwrap() {
        fields = generate_fields(fields.to_string(), camel_to_snake_case(key));
        fields_numbers = generate_fields(fields_numbers.to_string(), "?".to_string());
        fields_values.push(generate_correct_field_value(value));
    }

    println!("{:?}", fields_values);
    return (fields, fields_numbers, fields_values);
}

pub fn get_model_fields_information_for_update(model_data: Value) -> String {
    let mut fields: String = String::from("");

    // When iterating it seems that the object from serde it's sorted
    for (key, value) in model_data.as_object().unwrap() {
        let column = camel_to_snake_case(key);
        let fixed_value = generate_correct_field_value(value);
        let column_value = format!("{column} = '{fixed_value}'");
        fields = generate_fields(fields.to_string(), column_value);
    }
    return fields;
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

fn generate_correct_field_value(value: &Value) -> String {
    if value.is_string() {
        return match value.as_str() {
            Some(value) => to_sql_datetime(value),
            None => value.to_string(),
        };
    }
    return value.to_string();
}

fn to_sql_datetime(value: &str) -> String {
    match NaiveDateTime::parse_from_str(value, "%m/%d/%Y, %I:%M:%S %p") {
        Ok(datetime) => datetime.format("%Y-%m-%d %H:%M:%S").to_string(),
        Err(_) => value.to_string(),
    }
}

fn camel_to_snake_case(s: &str) -> String {
    let mut snake_case = String::new();
    for c in s.chars() {
        if c.is_ascii_uppercase() {
            snake_case.push('_');
        }
        snake_case.extend(c.to_lowercase());
    }
    return snake_case;
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_to_sql_datetime() {
        let date = to_sql_datetime("4/21/2023, 10:04:05 PM");
        assert_eq!("2023-04-21 22:04:05", date);
    }

    #[test]
    fn test_to_sql_datetime_wrong_value() {
        let date = to_sql_datetime("4/ 2 1 / 2023");
        assert_eq!("4/ 2 1 / 2023", date);
    }

    #[test]
    fn test_get_model_fields_information() {
        let model_data = json!({ "title": "name", "id": "5", "someThing": "d"});
        let (fields, fields_numbers, fields_values) = get_model_fields_information(model_data);
        assert_eq!("id, some_thing, title", fields);
        assert_eq!("?, ?, ?", fields_numbers);
        assert_eq!(vec!("5", "d", "name"), fields_values);
    }

    #[test]
    fn test_get_model_fields_information_for_update() {
        let model_data = json!({ "title": "name", "id": "5", "someThing": "d"});
        let fields = get_model_fields_information_for_update(model_data);
        assert_eq!("id = 5, some_thing = d, title = name", fields);
    }

    #[test]
    fn test_generate_fields() {
        let mut result = String::from("");
        for word in ["one", "two", "three"] {
            result = generate_fields(result, String::from(word));
        }
        assert_eq!("one, two, three", result);
    }

    #[test]
    fn test_camel_to_snake_case() {
        let result = camel_to_snake_case("heyThatsCool");
        assert_eq!("hey_thats_cool", result);
    }
}
