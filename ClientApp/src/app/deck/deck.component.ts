import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDeck } from "../models/deck";
import { IFlashcard } from "../models/flashcard";
import { DeckService } from "../services/deck.service";
import { FlashcardService } from "../services/flashcard.service";

@Component({
  selector: "app-deck-component",
  templateUrl: "./deck.component.html"
})

export class DeckComponent implements OnInit{
  viewTitle: string = "Table";
  decks: IDeck[] = [];
  flashcards: IFlashcard[] = [];
  deck: IDeck = {
    DeckId: 0,
    DeckName: "",
    DeckDescription: "",
    CreationDate: "",
    FolderId: 0
  };

  // injecting the HttpClient service into the component
  constructor(
    private _router: Router,
    private _deckService: DeckService,
    private _flashcardService: FlashcardService,
    private _route: ActivatedRoute) { }

  deleteDeck(): void {
    this._deckService.deleteItem(this.deck.DeckId)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this._router.navigate(["/folder/" + this.deck.FolderId]);
          }
        },
        error: (error: any) => {
          console.log("Error deleting item:", error);
        }
      });
  }

  deleteFlashcard(flashcardId: number): void {
    this._flashcardService.deleteItem(flashcardId)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.reloadPage();
          }
        },
        error: (error: any) => {
          console.log("Error deleting item:", error);
        }
      });
  }

  reloadPage() {
    location.reload();
  }

  getDeck(deckId: number): void {
    this._deckService.getDeckById(deckId)
      .subscribe(data => {
        this.deck = data;
        this.updateCreationDateDeck(this.deck);
      })
  }

  getFlashcards(deckId: number): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._flashcardService.getFlashcardsByDeckId(deckId)
      .subscribe(data => { // subscribe() used to receive the data when the response is received
        this.flashcards = data;
        this.updateCreationDateFlashcard(this.flashcards);
      });
  }


  updateCreationDateDeck(deck: IDeck): IDeck {
    const datePart = deck.CreationDate.split('T')[0];
    deck.CreationDate = datePart;
    return deck;
  }

  updateCreationDateFlashcard(flashcards: IFlashcard[]): void {
    flashcards.forEach(flashcard => {
      const datePart = flashcard.CreationDate.split('T')[0];
      flashcard.CreationDate = datePart;
    })
  }

  return() {

    if (this.deck.FolderId == null) {
      this._router.navigate(["/library"]);
    } else {
      this._router.navigate(["/folder/" + this.deck.FolderId]);
    }
  }

  createFlashcard() {
    this._router.navigate(['/flashcardform', 'create', this.deck.DeckId]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = this.deck.DeckId = + params["id"]
      this.getDeck(id);
      this.getFlashcards(id);
    })
  }
}
