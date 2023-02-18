use crate::db::models::notes::Note;
use crate::db::models::pros_cons::ProsCons;

pub struct Model {
    note: Note,
    pros_cons: ProsCons,
}

impl Model {
    fn get_model(&self) {}
}
