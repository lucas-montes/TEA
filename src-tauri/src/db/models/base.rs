use crate::db::operations::connect;
use rusqlite::Statement;

pub trait BaseModel {
    type QuerySet;
    fn create(&self) -> i8;
    fn update(&self) -> i8;
    fn get_all(&self, table: String) -> Vec<Self::QuerySet>;
    fn create_read_query(&self, table: String) -> Statement<'_> {
        let query: String = format!("SELECT * FROM {table}");
        return connect().prepare(&query).unwrap();
    }
    fn delete(&self, table: String, id: i16) -> i8 {
        let sql = format!("DELETE FROM {table} WHERE id = ?");
        let params = [&id];
        let result = connect().execute(&sql, &params);
        return 1;
    }
}

pub fn create<T>(model: T) -> i8
where
    T: BaseModel,
{
    return model.create();
}

pub fn read<T>(model: T, table: String) -> Vec<T::QuerySet>
where
    T: BaseModel,
{
    return model.get_all(table);
}

pub fn update<T>(model: T) -> i8
where
    T: BaseModel,
{
    return model.update();
}

pub fn delete<T>(model: T, table: String, id: i16) -> i8
where
    T: BaseModel,
{
    return model.delete(table, id);
}
