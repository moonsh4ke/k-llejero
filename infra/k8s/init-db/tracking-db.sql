-- Creando la tabla TrackingStatus si no existe
CREATE TABLE IF NOT EXISTS TrackingStatus (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    description TEXT,
    created_date DATETIME,
    updated_date DATETIME,
    is_active BOOLEAN,
    PRIMARY KEY (id)
);

-- Creando la tabla Tracking si no existe
CREATE TABLE IF NOT EXISTS Tracking (
    id VARCHAR(255) NOT NULL,
    tender_id VARCHAR(255),
    user_id VARCHAR(255),
    tracking_status_id VARCHAR(255),
    created_date DATETIME,
    updated_date DATETIME,
    PRIMARY KEY (id),
    INDEX idx_tender_id (tender_id),
    INDEX idx_user_id (user_id),
    INDEX idx_tracking_status_id (tracking_status_id)
);

-- Creando la tabla Notes si no existe
CREATE TABLE IF NOT EXISTS Notes (
    id VARCHAR(255) NOT NULL,
    tracking_id VARCHAR(255),
    description TEXT,
    created_date DATETIME,
    updated_date DATETIME,
    PRIMARY KEY (id),
    INDEX idx_tracking_id (tracking_id)
);

-- Creando la tabla CategoryTracking si no existe
CREATE TABLE IF NOT EXISTS CategoryTracking (
    category_id VARCHAR(255) NOT NULL,
    tracking_id VARCHAR(255) NOT NULL,
    created_date DATETIME,
    updated_date DATETIME,
    PRIMARY KEY (category_id, tracking_id),
    INDEX idx_tracking_id (tracking_id)
);

-- Creando la tabla TrackingQuotes si no existe
CREATE TABLE IF NOT EXISTS TrackingQuotes (
    tracking_id VARCHAR(255) NOT NULL,
    quote_id VARCHAR(255) NOT NULL,
    created_date DATETIME,
    updated_date DATETIME,
    PRIMARY KEY (tracking_id, quote_id),
    INDEX idx_quote_id (quote_id)
);