// Package router wires together the Gin engine, CORS middleware, and all
// route groups. Register every new route group here so the entry point
// (cmd/server/main.go) stays clean.
package router

import (
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lera/react_it-15/internal/handler"
)

// New creates a fully configured *gin.Engine.
//
// allowedOrigins is read from the CORS_ALLOWED_ORIGINS env var (comma-separated).
func New(allowedOrigins string) *gin.Engine {
	r := gin.New()

	// ── Middleware ─────────────────────────────────────────────────────────
	r.Use(gin.Logger())    // structured request logging
	r.Use(gin.Recovery())  // recover from panics with a 500 response

	// CORS — allows the Vite dev server (and any other listed origins) to
	// make cross-origin requests to this API.
	r.Use(cors.New(cors.Config{
		AllowOrigins:     splitOrigins(allowedOrigins),
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// ── Routes ────────────────────────────────────────────────────────────

	// Infrastructure / ops endpoints (no auth required)
	r.GET("/health", handler.Health)

	// ── TODO: API route groups ─────────────────────────────────────────────
	// Group versioned routes under /api/v1 so you can introduce /api/v2
	// later without breaking existing clients.
	//
	// Example:
	//   v1 := r.Group("/api/v1")
	//   {
	//       users := v1.Group("/users")
	//       users.GET("",      handler.ListUsers)
	//       users.GET("/:id",  handler.GetUser)
	//       users.POST("",     handler.CreateUser)
	//       users.PUT("/:id",  handler.UpdateUser)
	//       users.DELETE("/:id", handler.DeleteUser)
	//   }

	return r
}

// splitOrigins splits a comma-separated origins string into a slice,
// trimming whitespace from each entry.
func splitOrigins(s string) []string {
	parts := strings.Split(s, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if trimmed := strings.TrimSpace(p); trimmed != "" {
			out = append(out, trimmed)
		}
	}
	return out
}
