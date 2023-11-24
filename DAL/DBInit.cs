using FlashcardProject.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FlashcardProject.DAL;
public class DBInit
{
    public static void Seed(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.CreateScope();
        FlashcardProjectDbContext context = serviceScope.ServiceProvider.GetRequiredService<FlashcardProjectDbContext>();

        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        /* Deck seed */
        // seeding decks without a folder
        if (!context.Decks.Any())
        {
            // room to add more decks
            var decks = new List<Deck>
            {
                new Deck
                {
                    DeckName = "History",
                    DeckDescription = "A generation which ignores history has no past and no future.",
                    Flashcards = new List<Flashcard>
                    {
                        new Flashcard
                        {
                            Question = "Who was the first Emperor of Rome?",
                            Answer = "Augustus, formerly known as Octavian, was the first Emperor of Rome."
                        },
                        new Flashcard
                        {
                            Question = "Who wrote \"The Communist Manifesto\"?",
                            Answer = "Karl Marx and Friedrich Engels co-authored \"The Communist Manifesto\" in 1848."
                        },
                        new Flashcard
                        {
                            Question = "What was the primary cause of the Civil War in the United States?",
                            Answer = "The primary cause of the American Civil War was the issue of slavery."
                        },
                        new Flashcard
                        {
                            Question = "Who was the leader of the Nazi Party in Germany during World War II?",
                            Answer = "Adolf Hitler was the leader of the Nazi Party in Germany during World War II."
                        },
                        new Flashcard
                        {
                            Question = "What event is often considered the beginning of the Great Depression in the United States?",
                            Answer = "The stock market crash of 1929 is often seen as the beginning of the Great Depression."
                        },
                        new Flashcard
                        {
                            Question = "When did the Berlin Wall fall, leading to the reunification of Germany?",
                            Answer = "The Berlin Wall fell on November 9, 1989, leading to the reunification of East and West Germany."
                        },
                        new Flashcard
                        {
                            Question = "When was the American Declaration of Independence adopted?",
                            Answer = "The American Declaration of Independence was adopted on July 4, 1776."
                        },
                        new Flashcard
                        {
                            Question = "When was the Apollo program by NASA?",
                            Answer = "The NASA's Apollo program was achieved in 1969."
                        }
                    }
                }
            };
            context.AddRange(decks);
            context.SaveChanges();
        }

        /* Folder seed */
        if (!context.Folders.Any())
        {

            var folder1 = new Folder
            {
                FolderName = "DemoFolder1",
                FolderDescription = "Amidst the bustling city, a solitary bench by the tranquil pond offers a peaceful escape from the urban chaos.",

                // room to add more decks inside this folder
                Decks = new List<Deck>
                {
                    new Deck
                    {
                        DeckName = "Food",
                        DeckDescription = "One cannot think well, love well, sleep well, if one has not dined well.",

                        // room to add more flashcards inside this deck
                        Flashcards = new List<Flashcard>
                        {
                            new Flashcard
                            {
                                Question = "What is a Pizza?",
                                Answer = "Delicious Italian dish with a thin crust topped with tomato sauce, cheese, and various toppings."
                            },
                            new Flashcard
                            {
                                Question = "What is a Fried Chicken Leg?",
                                Answer = "Crispy and succulent chicken leg that is deep-fried to perfection, often served as a popular fast food item."
                            },
                            new Flashcard
                            {
                                Question = "What is French Fries?",
                                Answer = "Crispy, golden-brown potato slices seasoned with salt and often served as a popular side dish or snack."
                            },
                            new Flashcard
                            {
                                Question = "What is Grilled Ribs?",
                                Answer = "Tender and flavorful ribs grilled to perfection, usually served with barbecue sauce."
                            },
                            new Flashcard
                            {
                                Question = "What is Tacos?",
                                Answer = "Tortillas filled with various ingredients such as meat, vegetables, and salsa, folded into a delicious meal."

                            },
                            new Flashcard
                            {
                                Question = "What is Fish and Chips?",
                                Answer = "Classic British dish featuring battered and deep-fried fish served with thick-cut fried potatoes."
                            },
                            new Flashcard
                            {
                                Question = "What is a Cider?",
                                Answer = "Refreshing alcoholic beverage made from fermented apple juice, available in various flavors."
                            },
                            new Flashcard
                            {
                                Question = "What is a Coke?",
                                Answer = "Popular carbonated soft drink known for its sweet and refreshing taste. A short nickname for 'Cocaine'.",
                            }
                        }
                    }
                }

            };

            var folder2 = new Folder
            {
                FolderName = "DemoFolder2",
                FolderDescription = "This is just an empty demo folder to show how it would look like if the folder was empty"
            };
            context.AddRange(folder1, folder2);
            context.SaveChanges();
        }
    }
}

