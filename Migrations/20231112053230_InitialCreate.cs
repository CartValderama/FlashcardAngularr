using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlashcardProject.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Folders",
                columns: table => new
                {
                    FolderId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FolderName = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    FolderDescription = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Folders", x => x.FolderId);
                });

            migrationBuilder.CreateTable(
                name: "Decks",
                columns: table => new
                {
                    DeckId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DeckName = table.Column<string>(type: "TEXT", maxLength: 15, nullable: false),
                    DeckDescription = table.Column<string>(type: "TEXT", maxLength: 120, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    FolderId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Decks", x => x.DeckId);
                    table.ForeignKey(
                        name: "FK_Decks_Folders_FolderId",
                        column: x => x.FolderId,
                        principalTable: "Folders",
                        principalColumn: "FolderId");
                });

            migrationBuilder.CreateTable(
                name: "Flashcards",
                columns: table => new
                {
                    FlashcardId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Question = table.Column<string>(type: "TEXT", maxLength: 90, nullable: false),
                    Answer = table.Column<string>(type: "TEXT", maxLength: 90, nullable: false),
                    CreationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DeckId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flashcards", x => x.FlashcardId);
                    table.ForeignKey(
                        name: "FK_Flashcards_Decks_DeckId",
                        column: x => x.DeckId,
                        principalTable: "Decks",
                        principalColumn: "DeckId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Decks_FolderId",
                table: "Decks",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Flashcards_DeckId",
                table: "Flashcards",
                column: "DeckId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Flashcards");

            migrationBuilder.DropTable(
                name: "Decks");

            migrationBuilder.DropTable(
                name: "Folders");
        }
    }
}
