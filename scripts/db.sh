#!/bin/bash

# LionSTour Database Management Script
echo "🗄️  LionSTour Database Management"

show_help() {
    echo "Usage: ./scripts/db.sh [command]"
    echo ""
    echo "Commands:"
    echo "  generate    Generate Prisma client"
    echo "  migrate     Run database migrations"
    echo "  studio      Open Prisma Studio"
    echo "  seed        Seed the database with sample data"
    echo "  reset       Reset the database (CAUTION: Deletes all data)"
    echo "  help        Show this help message"
}

case $1 in
    generate)
        echo "Generating Prisma client..."
        pnpm run db:generate
        ;;
    migrate)
        echo "Running database migrations..."
        pnpm run db:migrate
        ;;
    studio)
        echo "Opening Prisma Studio on http://localhost:5555"
        pnpm run db:studio
        ;;
    seed)
        echo "Seeding database..."
        pnpm run db:seed
        ;;
    reset)
        echo "⚠️  WARNING: This will delete all data!"
        read -p "Are you sure? (y/N) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            pnpm dlx prisma migrate reset --force
        else
            echo "Database reset cancelled."
        fi
        ;;
    help|"")
        show_help
        ;;
    *)
        echo "Unknown command: $1"
        show_help
        exit 1
        ;;
esac