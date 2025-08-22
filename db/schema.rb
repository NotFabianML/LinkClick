# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_22_041849) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "icon"
    t.integer "rarity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "badges", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "badges_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "badge_id", null: false
  end

  create_table "events", force: :cascade do |t|
    t.bigint "session_id", null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.string "google_calendar_event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_events_on_session_id"
  end

  create_table "feedbacks", force: :cascade do |t|
    t.bigint "giver_id", null: false
    t.bigint "receiver_id", null: false
    t.bigint "session_id", null: false
    t.integer "rating"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["giver_id"], name: "index_feedbacks_on_giver_id"
    t.index ["receiver_id"], name: "index_feedbacks_on_receiver_id"
    t.index ["session_id"], name: "index_feedbacks_on_session_id"
  end

  create_table "interests", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "interests_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "interest_id", null: false
  end

  create_table "join_requests", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "session_id", null: false
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_join_requests_on_session_id"
    t.index ["user_id"], name: "index_join_requests_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "session_id", null: false
    t.bigint "sender_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sender_id"], name: "index_messages_on_sender_id"
    t.index ["session_id"], name: "index_messages_on_session_id"
  end

  create_table "resources", force: :cascade do |t|
    t.bigint "session_id", null: false
    t.integer "resource_type"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_resources_on_session_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "session_type"
    t.integer "status"
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "difficulty", default: 0
    t.integer "max_participants", default: 10
    t.date "start_date"
    t.time "start_time"
    t.float "duration"
    t.boolean "is_public", default: true, null: false
    t.boolean "allow_recording", default: false, null: false
    t.boolean "requires_approval", default: false, null: false
    t.index ["creator_id"], name: "index_sessions_on_creator_id"
  end

  create_table "sessions_users", id: false, force: :cascade do |t|
    t.bigint "session_id", null: false
    t.bigint "user_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.text "bio"
    t.string "linkedin_url"
    t.string "github_url"
    t.integer "role", default: 0, null: false
    t.string "phone"
    t.string "country"
    t.string "website"
    t.string "university"
    t.integer "profile_visibility", default: 0, null: false
    t.boolean "show_email", default: false, null: false
    t.boolean "show_phone", default: false, null: false
    t.boolean "show_activity", default: true, null: false
    t.boolean "allow_messages", default: true, null: false
    t.boolean "email_notifications", default: true, null: false
    t.boolean "session_reminders", default: true, null: false
    t.boolean "connection_requests", default: true, null: false
    t.boolean "marketing_emails", default: false, null: false
    t.datetime "discarded_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["discarded_at"], name: "index_users_on_discarded_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "events", "sessions"
  add_foreign_key "feedbacks", "sessions"
  add_foreign_key "feedbacks", "users", column: "giver_id"
  add_foreign_key "feedbacks", "users", column: "receiver_id"
  add_foreign_key "join_requests", "sessions"
  add_foreign_key "join_requests", "users"
  add_foreign_key "messages", "sessions"
  add_foreign_key "messages", "users", column: "sender_id"
  add_foreign_key "resources", "sessions"
  add_foreign_key "sessions", "users", column: "creator_id"
end
