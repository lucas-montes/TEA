use crate::db::models::BaseModel;
use crate::db::operations::connect;
use rusqlite::Result;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct Note {
    #[serde(rename = "id")]
    pub id: Option<i32>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
}

impl BaseModel for Note {
    fn create(&self) -> i8 {
        let sql = "INSERT INTO notes (created_at, title, content) VALUES (?, ?, ?)";
        let params = [&self.created_at, &self.title, &self.content];
        let result = connect().execute(sql, &params);
        return 1;
    }

    fn get_all(&self, table: String) -> Vec<Note> {
        let mut stmt = &self.create_read_query(table);

        let rows = stmt
            .query_map([], |row| {
                Ok(Note {
                    id: row.get(0)?,
                    created_at: row.get(1)?,
                    title: row.get(2)?,
                    content: row.get(3)?,
                })
            })
            .unwrap();

        let mut results = Vec::new();

        for row in rows {
            if let Ok(row) = row {
                results.push(row);
            }
        }
        return results;
    }

    fn update(&self) -> i8 {
        let sql = format!(
            "UPDATE notes SET created_at = {}, title = {}, content = {} WHERE id = {:#?}",
            &self.created_at, &self.title, &self.content, &self.id
        );

        let result = connect().execute(&sql, ());

        return 1;
    }
}
