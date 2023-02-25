#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use db::{
    handle_create, handle_delete, handle_read_kanbantickets, handle_read_notes,
    handle_read_proscons, handle_update, run_migrations,
};
use files::commands::show_files;
use menus::get_menu;
use tauri::Manager;

mod db;
mod files;
mod menus;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            // we perform the initialization code on a new task so the app doesn't freeze
            tauri::async_runtime::spawn(async move {
                // initialize your app here instead of sleeping :)
                println!("Initializing...");
                run_migrations();
                std::thread::sleep(std::time::Duration::from_secs(2));
                println!("Done initializing.");

                // After it's done, close the splashscreen and display the main window
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });
            Ok(())
        })
        .menu(get_menu())
        .invoke_handler(tauri::generate_handler![
            handle_create,
            handle_update,
            handle_delete,
            handle_read_notes,
            handle_read_proscons,
            handle_read_kanbantickets,
            show_files
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
