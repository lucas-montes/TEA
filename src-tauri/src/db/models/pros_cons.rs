use crate::db::operations::connect;
use rusqlite::Result;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct ProsCons {
    #[serde(rename = "id")]
    pub id: Option<i32>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
    #[serde(rename = "pros")]
    pub pros: String,
    #[serde(rename = "cons")]
    pub cons: String,
}

impl ProsCons {
    pub fn create(&self) -> Result<usize> {
        let conn = connect();

        let sql =
            "INSERT INTO pros_cons (created_at, title, content, pros, cons) VALUES (?, ?, ?, ?, ?)";
        let params = [
            &self.created_at,
            &self.title,
            &self.content,
            &self.pros,
            &self.cons,
        ];

        let result = conn.execute(sql, &params)?;

        Ok(result)
    }

    pub fn get_all() -> Vec<ProsCons> {
        let conn = connect();

        let mut stmt = conn.prepare("SELECT * FROM pros_cons").unwrap();

        let rows = stmt
            .query_map([], |row| {
                Ok(ProsCons {
                    id: row.get(0)?,
                    created_at: row.get(1)?,
                    title: row.get(2)?,
                    content: row.get(3)?,
                    pros: row.get(4)?,
                    cons: row.get(5)?,
                })
            })
            .unwrap();

        let mut result = Vec::new();

        for row in rows {
            if let Ok(row) = row {
                result.push(row);
            }
        }
        return result;
    }

    pub fn update(&self) -> Result<usize> {
        let conn = connect();

        let sql = format!(
            "UPDATE pros_cons SET created_at = {}, title = {}, content = {}, pros = {}, cons = {} WHERE id = {:#?}",
            &self.created_at, &self.title, &self.content, &self.pros, &self.cons, &self.id
        );

        let result = conn.execute(&sql, ())?;

        Ok(result)
    }
}
