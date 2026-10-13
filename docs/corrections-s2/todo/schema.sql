-- À importer dans la base mmi_s2 que vous avez créée. Aucune base existante n'est supprimée.
CREATE TABLE IF NOT EXISTS todos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  done TINYINT(1) NOT NULL DEFAULT 0
) CHARACTER SET utf8mb4;
