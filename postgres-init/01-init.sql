-- ./postgres-init/01-init.sql

-- Create tables and insert dummy data

-- Users table
CREATE TABLE IF NOT EXISTS users (
    email_id VARCHAR(255) PRIMARY KEY,
    hashed_password TEXT NOT NULL
);

INSERT INTO users (email_id, hashed_password) VALUES 
('user1@example.com', 'hashedpassword1'),
('user2@example.com', 'hashedpassword2'),
('user3@example.com', 'hashedpassword3')
ON CONFLICT (email_id) DO NOTHING;

-- Jokes table
CREATE TABLE IF NOT EXISTS jokes (
    jokeID SERIAL PRIMARY KEY,
    postedBy VARCHAR(255) NOT NULL,
    timeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    joke TEXT NOT NULL,
    FOREIGN KEY (postedBy) REFERENCES users(email_id)
);

INSERT INTO jokes (postedBy, joke) VALUES 
('user1@example.com', 'Why did the scarecrow win an award? Because he was outstanding in his field.'),
('user2@example.com', 'I told my wife she should embrace her mistakes. She gave me a hug.'),
('user3@example.com', 'Why don’t skeletons fight each other? They don’t have the guts.')
ON CONFLICT (jokeID) DO NOTHING;

-- Metadata table
CREATE TABLE IF NOT EXISTS metadata (
    totalJokes INT,
    totalUsers INT
);

INSERT INTO metadata (totalJokes, totalUsers) VALUES 
((SELECT COUNT(*) FROM jokes), (SELECT COUNT(*) FROM users))
ON CONFLICT DO NOTHING;
