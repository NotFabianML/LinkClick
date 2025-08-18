# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

# Usaremos una transacción. Si algo falla, toda la operación se revierte.
ActiveRecord::Base.transaction do
  puts "==> Limpiando la base de datos..."
  # Destruimos los modelos en un orden que respete las dependencias
  Feedback.destroy_all
  Message.destroy_all
  Event.destroy_all
  Resource.destroy_all
  Session.destroy_all
  User.destroy_all
  Interest.destroy_all
  Badge.destroy_all

  puts "==> Creando Intereses y Badges..."
  interests = [
    'Ruby on Rails', 'React', 'TypeScript', 'Node.js', 'Python', 'Docker',
    'PostgreSQL', 'GraphQL', 'UI/UX Design', 'Machine Learning', 'DevOps'
  ].map { |name| Interest.create!(name: name) }

  badges = [
    { name: 'Primeros Pasos', description: 'Completó la configuración de su perfil.' },
    { name: 'Colaborador Activo', description: 'Participó en 5 o más sesiones.' },
    { name: 'Mentor Estrella', description: 'Recibió una calificación promedio de 4.5 o más como docente.' },
    { name: 'Creador de Conocimiento', description: 'Creó su primera sesión de estudio.' }
  ].map { |attrs| Badge.create!(attrs) }

  puts "==> Creando Usuarios..."
  # --- Admin ---
  admin = User.create!(
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@linkclick.com',
    password: 'password',
    password_confirmation: 'password',
    role: User::ROLES[:admin],
    bio: 'Administrador de la plataforma LinkClick.'
  )

  # --- Docentes ---
  teacher1 = User.create!(
    first_name: 'Ana',
    last_name: 'Rojas',
    email: 'ana.rojas@teacher.com',
    password: 'password',
    password_confirmation: 'password',
    role: User::ROLES[:teacher],
    bio: 'Ingeniera de software con 10 años de experiencia en desarrollo backend con Ruby on Rails y arquitecturas de microservicios.',
    university: 'Tecnológico de Costa Rica',
    country: 'Costa Rica'
  )
  teacher1.interests << interests.select { |i| [ 'Ruby on Rails', 'PostgreSQL', 'DevOps' ].include?(i.name) }

  teacher2 = User.create!(
    first_name: 'Carlos',
    last_name: 'Mora',
    email: 'carlos.mora@teacher.com',
    password: 'password',
    password_confirmation: 'password',
    role: User::ROLES[:teacher],
    bio: 'Desarrollador Frontend especializado en React y TypeScript. Apasionado por crear interfaces de usuario accesibles y de alto rendimiento.',
    university: 'Universidad de Costa Rica',
    country: 'Costa Rica'
  )
  teacher2.interests << interests.select { |i| [ 'React', 'TypeScript', 'UI/UX Design' ].include?(i.name) }

  # --- Estudiantes y sus Sesiones ---
  puts "==> Creando Estudiantes y Sesiones..."
  student1 = User.create!(
    first_name: 'Sofía',
    last_name: 'Fernández',
    email: 'sofia.fernandez@student.com',
    password: 'password',
    password_confirmation: 'password',
    role: User::ROLES[:student],
    bio: 'Estudiante de ingeniería de software buscando colaborar en proyectos de React.',
    university: 'Universidad Cenfotec',
    country: 'Costa Rica'
  )
  student1.interests << interests.select { |i| [ 'React', 'Node.js', 'Docker' ].include?(i.name) }

  session1 = student1.created_sessions.create!(
    title: 'Grupo de estudio para proyecto de React',
    description: 'Busco compañeros para desarrollar el proyecto final del curso de React. La idea es aplicar hooks, context y testing.',
    session_type: Session::SESSION_TYPES[:project_collab],
    status: Session::STATUS[:published]
  )
  session1.participants << [ student1, teacher1 ] # El estudiante y un docente participan

  student2 = User.create!(
    first_name: 'Mateo',
    last_name: 'Vargas',
    email: 'mateo.vargas@student.com',
    password: 'password',
    password_confirmation: 'password',
    role: User::ROLES[:student],
    bio: 'Interesado en Python y Machine Learning. Busco tutorías para reforzar mis conocimientos.',
    university: 'Tecnológico de Costa Rica',
    country: 'Costa Rica'
  )
  student2.interests << interests.select { |i| [ 'Python', 'Machine Learning' ].include?(i.name) }

  session2 = student2.created_sessions.create!(
    title: 'Tutoría de Python para Data Science',
    description: 'Necesito ayuda para entender las librerías Pandas y Matplotlib.',
    session_type: Session::SESSION_TYPES[:quick_tutoring],
    status: Session::STATUS[:published]
  )
  session2.participants << [ student2, teacher2 ]

  student3 = User.create!(
    first_name: 'Lucía',
    last_name: 'Jiménez',
    email: 'lucia.jimenez@student.com',
    password: 'password',
    password_confirmation: 'password',
    role: User::ROLES[:student],
    bio: 'Aprendiendo a desplegar aplicaciones con Docker y Rails.',
    university: 'Universidad de Costa Rica',
    country: 'Costa Rica'
  )
  student3.interests << interests.select { |i| [ 'Ruby on Rails', 'Docker', 'DevOps' ].include?(i.name) }

  session3 = student3.created_sessions.create!(
    title: 'Workshop de Docker Básico',
    description: 'Quiero organizar un pequeño workshop para los que, como yo, están empezando con Docker.',
    session_type: Session::SESSION_TYPES[:workshop],
    status: Session::STATUS[:published]
  )
  session3.participants << [ student3, student1, teacher1 ]

  puts "==> Creando Feedback..."
  Feedback.create!(
    giver: teacher1,
    receiver: student1,
    session: session1,
    rating: 5,
    comment: 'Sofía es muy proactiva y tiene un gran potencial. Excelente colaboradora.'
  )
  Feedback.create!(
    giver: student2,
    receiver: teacher2,
    session: session2,
    rating: 4,
    comment: 'Carlos explica muy bien, aunque a veces va un poco rápido. La tutoría fue de gran ayuda.'
  )
end

puts "✅ Base de datos poblada con éxito."
