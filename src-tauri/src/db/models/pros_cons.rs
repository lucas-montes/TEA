use crate::db::models::BaseModel;
use crate::db::operations::connect;
use rusqlite::{Result, Row};
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

impl BaseModel for ProsCons {
    type QuerySet = ProsCons;

    fn read(&self) -> Vec<Self::QuerySet> {
        let conn = connect();
        let mut stmt = conn.prepare("SELECT * FROM proscons").unwrap();

        let rows = stmt
            .query_map([], |row| {
                Ok(Self::QuerySet {
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
}
