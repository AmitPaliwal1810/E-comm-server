/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS productimages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "url" VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    archived_at TIMESTAMP DEFAULT NULL
);