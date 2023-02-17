use crate::db::models::Note;
use serde_json::Value;

pub fn handle_methods(method_name: &str, model_data: Value) {
    let callable_method = match method_name {
        "create" => create,
        "update" => update,
        "read" => read,
        "delete" => delete,
        &_ => todo!(),
    };
    let table: String = get_table(model_data);
    let model: String = get_model(&table);
    return callable_method();
}

fn get_table(mut model_data: Value) -> String {
    return model_data
        .as_object_mut()
        .unwrap()
        .remove("table")
        .unwrap()
        .to_string();
}

fn get_model(table: &str) -> Note {
    let model = match table {
        "notes" => Note,
        &_ => Note,
    };
    return model;
}

fn create() {}
fn delete() {}
fn read() {}
fn update() {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_table() {
        let model_data = json!({ "title": "name", "table": "note"});
        assert_eq!("note", get_table(model_data));
    }

    #[test]
    fn test_get_model() {
        assert_eq!("note", get_model("note"));
    }
}
