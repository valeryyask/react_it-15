// Package config loads all runtime configuration from environment variables.
// Values are populated by loading a .env file (via godotenv) before this
// package is used — see cmd/server/main.go for the loading call.
package config

import (
	"fmt"
	"os"
)

// Config holds every tunable value the application needs at startup.
type Config struct {
	// HTTP server
	ServerPort string

	// Oracle database connection
	DBHost     string
	DBPort     string
	DBService  string
	DBUser     string
	DBPassword string

	// CORS — comma-separated list of allowed origins
	CORSAllowedOrigins string
}

// Load reads environment variables and returns a populated Config.
// Call this once at startup after loading the .env file.
func Load() (*Config, error) {
	cfg := &Config{
		ServerPort:         getEnv("SERVER_PORT", "8080"),
		DBHost:             getEnv("DB_HOST", "localhost"),
		DBPort:             getEnv("DB_PORT", "1521"),
		DBService:          getEnv("DB_SERVICE", "ORCLPDB1"),
		DBUser:             getEnv("DB_USER", ""),
		DBPassword:         getEnv("DB_PASSWORD", ""),
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:5173"),
	}

	// Fail fast if mandatory credentials are missing.
	if cfg.DBUser == "" || cfg.DBPassword == "" {
		return nil, fmt.Errorf("DB_USER and DB_PASSWORD must be set in the environment")
	}

	return cfg, nil
}

// getEnv returns the value of key, or fallback when the variable is unset/empty.
func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
