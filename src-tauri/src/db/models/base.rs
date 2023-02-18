use crate::db::models::notes::Note;
use crate::db::models::pros_cons::ProsCons;
use serde_json::{from_str, Value};

enum Model {
    NoteModel(Note),
    ProsConsModel(ProsCons),
    Other(Value),
}

impl Model {
    fn get_model(action: &str, model_name: &str, model_data: String) {
        if model_name == "note" {
            let result: Note = from_str(model_data.as_str()).unwrap();
        } else {
            let result: ProsCons = from_str(model_data.as_str()).unwrap();
        }
        if model_name == "create" {
            return result.create();
        } else if model_name == "read" {
            return result.read();
        } else if model_name == "update" {
            return result.update();
        } else if model_name == "delete" {
            return result.delete();
        }
    }
}
