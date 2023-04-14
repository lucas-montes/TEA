use crate::db::operations::connect;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct Project {
    pub id: Option<i32>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "updatedAt")]
    updated_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
}

impl Project {
    pub fn read() -> Vec<Project> {
        let conn = connect();
        let mut stmt = conn.prepare("SELECT * FROM projects").unwrap();

        let rows = stmt
            .query_map([], |row| {
                Ok(Project {
                    id: row.get(0)?,
                    created_at: row.get(1)?,
                    updated_at: row.get(2)?,
                    title: row.get(3)?,
                    content: row.get(4)?,
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
#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct Task {
    pub id: Option<i32>,
    #[serde(rename = "projectId")]
    pub project_id: Option<i32>,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "updatedAt")]
    updated_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
    #[serde(rename = "taskStatus")]
    pub task_stauts: String,
}

impl Task {
    pub fn read() -> Vec<Task> {
        let conn = connect();
        let mut stmt = conn.prepare("SELECT * FROM tasks").unwrap();

        let rows = stmt
            .query_map([], |row| {
                Ok(Task {
                    id: row.get(0)?,
                    project_id: row.get(1)?,
                    created_at: row.get(2)?,
                    updated_at: row.get(3)?,
                    title: row.get(4)?,
                    content: row.get(5)?,
                    task_stauts: row.get(6)?,
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
