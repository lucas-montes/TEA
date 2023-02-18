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

impl Note {
    pub fn create(&self) -> Result<usize> {
        let conn = connect();

        let sql = "INSERT INTO notes (created_at, title, content) VALUES (?, ?, ?)";
        let params = [&self.created_at, &self.title, &self.content];

        let result = conn.execute(sql, &params)?;

        Ok(result)
    }

    pub fn get_all() -> Vec<Note> {
        let conn = connect();

        let mut stmt = conn.prepare("SELECT * FROM notes").unwrap();

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

        let mut notes = Vec::new();

        for row in rows {
            if let Ok(row) = row {
                notes.push(row);
            }
        }
        return notes;
    }

    pub fn update(&self) -> Result<usize> {
        let conn = connect();

        let sql = format!(
            "UPDATE notes SET created_at = {}, title = {}, content = {} WHERE id = {:#?}",
            &self.created_at, &self.title, &self.content, &self.id
        );

        let result = conn.execute(&sql, ())?;

        Ok(result)
    }

    pub fn delete(&self) -> Result<usize> {
        let conn = connect();

        let sql = "DELETE FROM notes WHERE id = ?";
        let params = [&self.id];

        let result = conn.execute(sql, &params)?;

        Ok(result)
    }
}
