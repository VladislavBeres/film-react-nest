-- 1. Таблица films
CREATE TABLE IF NOT EXISTS films (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rating DOUBLE PRECISION NOT NULL,
    director VARCHAR NOT NULL,
    tags TEXT[],
    title VARCHAR NOT NULL,
    about VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    cover VARCHAR NOT NULL
);

-- 2. Таблица schedules
CREATE TABLE IF NOT EXISTS schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    daytime VARCHAR NOT NULL,
    hall INTEGER NOT NULL,
    rows INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    taken TEXT,
    "filmId" UUID NOT NULL,
    CONSTRAINT fk_film FOREIGN KEY ("filmId") REFERENCES films(id) ON DELETE CASCADE
);
