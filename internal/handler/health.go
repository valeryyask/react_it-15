// Package handler contains all HTTP handler functions.
// Each handler is kept thin: it reads the request, delegates work to a
// service / repository layer, and writes a structured JSON response.
package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lera/react_it-15/internal/db"
)

// HealthResponse is the JSON shape returned by GET /health.
type HealthResponse struct {
	Status   string `json:"status"`
	Database string `json:"database"`
	Message  string `json:"message,omitempty"`
}

// Health pings the Oracle database and reports whether the server is healthy.
//
// GET /health
//
// Responses:
//   200 OK   – server is running and DB is reachable
//   503 ServiceUnavailable – server is running but DB ping failed
func Health(c *gin.Context) {
	if err := db.Pool.PingContext(c.Request.Context()); err != nil {
		c.JSON(http.StatusServiceUnavailable, HealthResponse{
			Status:   "degraded",
			Database: "unreachable",
			Message:  err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, HealthResponse{
		Status:   "ok",
		Database: "connected",
	})
}

// ── TODO: Add more handlers below (or in separate files) ──────────────────────
// Example for a future "users" resource:
//
//   func ListUsers(c *gin.Context)  { /* query db, return JSON array  */ }
//   func GetUser(c *gin.Context)    { /* query by :id, return JSON obj */ }
//   func CreateUser(c *gin.Context) { /* bind JSON body, insert, 201  */ }
//   func UpdateUser(c *gin.Context) { /* bind JSON body, update, 200  */ }
//   func DeleteUser(c *gin.Context) { /* delete by :id, 204           */ }
