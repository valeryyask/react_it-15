// main is the application entry point.
// Responsibilities:
//  1. Load .env (development convenience — in production, set real env vars).
//  2. Parse configuration.
//  3. Open the Oracle connection pool.
//  4. Build the HTTP router.
//  5. Start the server and handle graceful shutdown on SIGTERM / SIGINT.
package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"
	"github.com/lera/react_it-15/config"
	"github.com/lera/react_it-15/internal/db"
	"github.com/lera/react_it-15/internal/router"
)

func main() {
	// ── 1. Load .env ──────────────────────────────────────────────────────
	// godotenv.Load is intentionally lenient: if .env is absent (e.g. in a
	// container where real env vars are injected), execution continues normally.
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found — using environment variables directly")
	}

	// ── 2. Configuration ──────────────────────────────────────────────────
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Configuration error: %v", err)
	}

	// ── 3. Database ───────────────────────────────────────────────────────
	if err := db.Connect(cfg); err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer db.Close()
	log.Println("Database connection pool established")

	// ── 4. Router ─────────────────────────────────────────────────────────
	r := router.New(cfg.CORSAllowedOrigins)

	// ── 5. HTTP server with graceful shutdown ─────────────────────────────
	srv := &http.Server{
		Addr:         ":" + cfg.ServerPort,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start listening in a goroutine so the main thread can wait for signals.
	go func() {
		log.Printf("Server listening on http://localhost:%s", cfg.ServerPort)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Block until SIGTERM or SIGINT is received.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server…")

	// Give in-flight requests up to 10 seconds to complete.
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Forced shutdown: %v", err)
	}
	log.Println("Server stopped cleanly")

	// ── TODO: Add any additional cleanup here ──────────────────────────────
	// e.g. flush message queues, close cache clients, etc.
}
