// Package db manages the Oracle database connection pool.
// The exported Pool variable is a *sql.DB that every handler / service
// should use — never open a new connection directly in business logic.
package db

import (
	"database/sql"
	"fmt"
	"net/url"

	"github.com/lera/react_it-15/config"

	// go-ora is a pure-Go Oracle driver — no Oracle Instant Client required.
	// The blank import registers it as the "oracle" driver for database/sql.
	_ "github.com/sijms/go-ora/v2"
)

// Pool is the application-wide, concurrency-safe database connection pool.
// It is initialised by Connect() and should be treated as read-only after that.
var Pool *sql.DB

// Connect opens (and validates) a connection to the Oracle DB described in cfg.
// It should be called exactly once during application startup.
func Connect(cfg *config.Config) error {
	// go-ora DSN format:
	//   oracle://user:password@host:port/service
	dsn := fmt.Sprintf(
		"oracle://%s:%s@%s:%s/%s",
		url.PathEscape(cfg.DBUser),
		url.PathEscape(cfg.DBPassword),
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBService,
	)

	db, err := sql.Open("oracle", dsn)
	if err != nil {
		return fmt.Errorf("db: sql.Open failed: %w", err)
	}

	// Verify the connection is actually reachable.
	if err := db.Ping(); err != nil {
		return fmt.Errorf("db: initial ping failed: %w", err)
	}

	// ── Connection-pool tuning ─────────────────────────────────────────────
	// Adjust these values to match your expected workload.
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	// db.SetConnMaxLifetime(5 * time.Minute)  // uncomment if needed

	Pool = db
	return nil
}

// Close releases all connections held by Pool.
// Call this in a deferred statement right after Connect() succeeds.
func Close() {
	if Pool != nil {
		_ = Pool.Close()
	}
}

// ── TODO: Business Logic ───────────────────────────────────────────────────────
// Add repository functions below (or in separate files inside this package).
// Example:
//
//   func GetUserByID(ctx context.Context, id int) (*User, error) {
//       row := Pool.QueryRowContext(ctx, "SELECT id, name FROM users WHERE id = :1", id)
//       // … scan and return
//   }
