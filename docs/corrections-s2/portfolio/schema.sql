-- À importer dans la base mmi_s2 que vous avez créée. Aucune base existante n'est supprimée.
CREATE TABLE IF NOT EXISTS projects (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL DEFAULT '',
  start_date DATE NOT NULL,
  end_date DATE NULL,
  technologies VARCHAR(200) NOT NULL DEFAULT '',
  project_url VARCHAR(500) NOT NULL DEFAULT '',
  code_url VARCHAR(500) NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4;
