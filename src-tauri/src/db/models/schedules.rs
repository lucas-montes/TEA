use crate::db::operations::connect;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Serialize)]
pub struct Schedule {
    #[serde(rename = "id")]
    pub id: Option<i32>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "updatedAt")]
    updated_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
    #[serde(rename = "startTime")]
    pub start_time: String,
    #[serde(rename = "endTime")]
    pub end_time: String,
    #[serde(rename = "color")]
    pub color: String,
    #[serde(rename = "day")]
    pub day: String,
}

impl Schedule {
    pub fn read() -> Vec<Schedule> {
        let conn = connect();
        let mut stmt = conn.prepare("SELECT * FROM schedules").unwrap();
        let rows = stmt
            .query_map([], |row| {
                Ok(Schedule {
                    id: row.get(0)?,
                    created_at: row.get(1)?,
                    updated_at: row.get(2)?,
                    title: row.get(3)?,
                    content: row.get(4)?,
                    start_time: row.get(5)?,
                    end_time: row.get(6)?,
                    color: row.get(7)?,
                    day: row.get(8)?,
                })
            })
            .unwrap();

        let mut results = Vec::new();

        for row in rows {
            if let Ok(row) = row {
                results.push(row);
            }
        }
        println!("{:?}", results);
        return results;
    }
}
