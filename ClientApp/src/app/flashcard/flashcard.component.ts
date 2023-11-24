import { Component, OnInit } from "@angular/core";
import { IFlashcard } from "../models/flashcard";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FlashcardService } from "../services/flashcard.service";

@Component({
  selector: "app-flashcard-component",
  templateUrl: "./flashcard.component.html"
})

export class FlashcardComponent implements OnInit{
  viewTitle: string = "Table";
  private _listFilter: string = "";
  flashcards: IFlashcard[] = [];

  // injecting the HttpClient service into the component
  constructor(
    private _router: Router,
  private _flashcardService: FlashcardService) {}

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter: ", value);
    this.filteredFlashcards = this.performFilter(value);
  }

  deleteFlashcard(flashcard: IFlashcard): void {
    const confirmDelete = confirm(`Are you sure you want to delete flashcard #${flashcard.FlashcardId}?`);

    if (confirmDelete) {
      this._flashcardService.deleteItem(flashcard.FlashcardId)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this.filteredFlashcards = this.filteredFlashcards.filter(f => f !== flashcard);
          }
        },
          (error) => {
            console.log("Error deleting item:", error);
          });
    }
  }

  getFlashcards(): void {
    // call to the server with the url "api/item/", expected return type is an IFlashcard array. This is also an observable return by the get
    this._flashcardService.getFlashcards()
      .subscribe(data => { // subscribe() used to receive the data when the response is received 
        console.log("All", JSON.stringify(data));
        this.flashcards = data;
        this.filteredFlashcards = this.flashcards;
      });
  }

  filteredFlashcards: IFlashcard[] = this.flashcards;
  performFilter(filterBy: string): IFlashcard[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.flashcards.filter((flashcard: IFlashcard) =>
      flashcard.Question.toLocaleLowerCase().includes(filterBy));
  }

  navigateToFlashcardform() {
    this._router.navigate(["/flashcardform"]);
  }

  ngOnInit(): void {
    console.log("FlashcardComponent created");
    this.getFlashcards();
    console.log("getFlashcards() called from oninit!")
  }
}
