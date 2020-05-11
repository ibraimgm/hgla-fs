package migrations

import (
	"database/sql"
	"fmt"
	"os"
	"strings"

	"github.com/markbates/pkger"
	migrate "github.com/rubenv/sql-migrate"
)

// Run updates the database schema to the last bundled version
func Run(driverName string, db *sql.DB) error {
	folderName, err := driverToFolder(driverName)
	if err != nil {
		return err
	}

	migrationSource := pkgerMigrationSource("/migrations/" + folderName)

	if _, err := migrate.Exec(db, folderName, migrationSource, migrate.Up); err != nil {
		return err
	}

	return nil
}

func driverToFolder(driver string) (string, error) {
	// this can be used to support other database drivers/types,
	// ex:
	// pq  = postgres
	// pgx = postgres
	switch driver {
	case "mysql":
		return "mysql", nil

	default:
		return "", fmt.Errorf("migrations to driver '%s' not implemented yet", driver)
	}
}

// despite implementing http.FileSystem, a pkger.Dir cannot be used directly as a migration
// source, because the file naming in the 'Open' call does not match exactly with whathever
// pkger expects.
//
// So, the solution is to manually walk the files and build the migration array.
type pkgerMigrationSource string

func (src pkgerMigrationSource) FindMigrations() ([]*migrate.Migration, error) {
	ms := make([]*migrate.Migration, 0)

	err := pkger.Walk(string(src), func(path string, info os.FileInfo, e error) error {
		if !strings.HasSuffix(path, ".sql") {
			return nil
		}

		file, err := pkger.Open(path)
		if err != nil {
			return err
		}
		defer file.Close()

		m, err := migrate.ParseMigration(info.Name(), file)
		if err != nil {
			return err
		}

		ms = append(ms, m)
		return nil
	})

	return ms, err
}
