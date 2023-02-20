use crate::db::operations::connect;
use rusqlite::Statement;

pub trait BaseModel {
    type QuerySet;

    fn get_all(&self, table: String) -> Vec<Self::QuerySet>;
    fn create_read_query(&self, table: String, fields: Option<String>) -> Statement<'_> {
        fields.unwrap_or(String::from("*"));
        let query: String = format!("SELECT {:?} FROM {table}", fields);
        return connect().prepare(&query).unwrap();
    }
}

pub fn read<T>(model: T, table: String) -> Vec<T::QuerySet>
where
    T: BaseModel,
{
    return model.get_all(table);
}
