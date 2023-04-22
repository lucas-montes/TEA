use crate::db::operations::connect;
use rusqlite::Connection;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug, Clone, Serialize)]
pub struct Project {
    pub id: i32,
    #[serde(rename = "createdAt")]
    pub created_at: String,
    #[serde(rename = "updatedAt")]
    pub updated_at: String,
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
    pub id: i32,
    #[serde(rename = "projectId")]
    pub project_id: i32,
    #[serde(rename = "createdAt")]
    pub created_at: String,
    #[serde(rename = "updatedAt")]
    pub updated_at: String,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
    #[serde(rename = "taskStatus")]
    pub task_status: String,
}

impl Task {
    pub fn read() -> Vec<Task> {
        let conn = connect();
        let mut stmt = conn.prepare("SELECT * FROM tasks").unwrap();

        let rows = stmt
            .query_map([], |row| {
                Ok(Task {
                    id: row.get(0)?,
                    created_at: row.get(1)?,
                    updated_at: row.get(2)?,
                    title: row.get(3)?,
                    content: row.get(4)?,
                    task_status: row.get(5)?,
                    project_id: row.get(6)?,
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
pub struct ProjectWithTasks {
    project: Project,
    tasks: Vec<Task>,
}

pub fn get_projects_with_tasks() -> Vec<ProjectWithTasks> {
    // Avoid doing this stupid loops and do a better SQL job
    let projects = Project::read();
    let mut tasks = Task::read();
    let mut projects_with_tasks: Vec<ProjectWithTasks> = Vec::new();
    for project in projects.iter() {
        let mut tasks_for_project = Vec::new();
        for i in (0..tasks.len()).rev() {
            if tasks[i].project_id == project.id {
                let task = tasks.swap_remove(i);
                tasks_for_project.push(task);
            }
        }
        let project_with_tasks = ProjectWithTasks {
            project: project.clone(),
            tasks: tasks_for_project,
        };
        projects_with_tasks.push(project_with_tasks);
    }
    return projects_with_tasks;
}

// }
// let mut stmt = conn.prepare("
//     SELECT projects.*, GROUP_CONCAT(tasks.title) AS task_titles, GROUP_CONCAT(tasks.content) AS task_contents, GROUP_CONCAT(tasks.task_status) AS task_statuses
//     FROM projects
//     LEFT JOIN tasks ON tasks.project_id = projects.id
//     GROUP BY projects.id
//     ORDER BY projects.id
// ")?;
// let projects_with_tasks = stmt.query_map([], |row| {
//     let task_titles: String = row.get(5)?;
//     let task_contents: String = row.get(6)?;
//     let task_statuses: String = row.get(7)?;
//     let tasks: Vec<Task> = task_titles
//         .split(",")
//         .zip(task_contents.split(","))
//         .zip(task_statuses.split(","))
//         .map(|((title, content), status)| Task {
//             id: None,
//             project_id: None,
//             created_at: String::new(),
//             updated_at: String::new(),
//             title: title.to_string(),
//             content: content.to_string(),
//             task_status: status.to_string(),
//         })
//         .collect();
//     Ok(ProjectWithTasks {
//         project: Project {
//             id: row.get(0)?,
//             created_at: row.get(1)?,
//             updated_at: row.get(2)?,
//             title: row.get(3)?,
//             content: row.get(4)?,
//         },
//         tasks: tasks,
//     })
// })?;
