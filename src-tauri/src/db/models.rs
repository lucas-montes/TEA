use crate::db::schema::notes;
use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Insertable)]
#[table_name = "notes"]
pub struct NewNote<'a> {
    pub created_at: &'a chrono::NaiveDateTime,
    pub updated_at: &'a chrono::NaiveDateTime,
    pub title: String,
    pub content: String,
}

#[derive(Deserialize, Debug, Clone, Serialize, Queryable)]
pub struct Note {
    #[serde(rename = "id")]
    pub id: i32,
    #[serde(rename = "createdAt")]
    pub created_at: NaiveDateTime,
    #[serde(rename = "updatedAt")]
    pub updated_at: NaiveDateTime,
    #[serde(rename = "title")]
    pub title: String,
    #[serde(rename = "content")]
    pub content: String,
}
