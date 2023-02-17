// @generated automatically by Diesel CLI.

diesel::table! {
    notes (id) {
        id -> Nullable<Integer>,
        title -> Text,
        content -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
