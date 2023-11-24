import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IFlashcard } from "../models/flashcard";
import { FlashcardService } from "../services/flashcard.service";

@Component({
  selector: "app-flashcard-flashcardform",
  templateUrl: "./flashcardform.component.html"
})

export class FlashcardformComponent implements OnInit {
  flashcardForm: FormGroup;
  isEditMode: boolean = false;
  flashcardId: number = -1;
  deckId: number = -1;
  flashcard: IFlashcard = {
    FlashcardId: 0,
    Question: "",
    Answer: "",
    CreationDate: "",
    DeckId: 0
  }
  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _flashcardService: FlashcardService) {
    this.flashcardForm = _formbuilder.group({
      question: ["", [
        Validators.required,
        Validators.maxLength(120)
      ]],
      answer: ["", [
        Validators.required,
        Validators.maxLength(120)
      ]],
      deckId: null
    })
  }

  getDeckId(): void {
    this._flashcardService.getFlashcardById(this.flashcardId)
      .subscribe(data => {
        this.flashcard = data;
        this.deckId = this.flashcard.DeckId;
      })
  }

  onSubmit() {
    const newFlashcard = this.flashcardForm.value;
    newFlashcard.deckId = this.deckId;
    if (this.isEditMode) {
      this._flashcardService.updateFlashcard(this.flashcardId, newFlashcard)
        .subscribe(response => {
          if (response.success) {

            this._router.navigate(["/deck/" + this.deckId]);
          }
          else {
            console.log("Flashcard update failed");
          }
        })
    }
    else {
      this._flashcardService.createFlashcard(this.deckId, newFlashcard)
          .subscribe(response => {
            if (response.success) {
              this._router.navigate(["/deck/" + this.deckId]);
            }
            else {
              console.log("Flashcard creation failed");
            }
          });
    };
  }

  backToFlashcards() {
    this._router.navigate(["/deck/" + this.deckId]);
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params["mode"] === "create") {
        this.deckId = params["id"];
        this.isEditMode = false; // Create mode
      } else if (params["mode"] === "update") {
        this.flashcardId = params["id"];
        this.isEditMode = true; // Edit mode
        this.loadItemForEdit(params["id"]);
        this.getDeckId();
      }
    });
    this.validationFlashcard();

  }

  loadItemForEdit(flashcardId: number) {
    this._flashcardService.getFlashcardById(flashcardId)
      .subscribe(
        (flashcard: any) => {
          this.flashcardForm.patchValue({
            question: flashcard.Question,
            answer: flashcard.Answer
          });
        },
        (error: any) => {
          console.error("Error loading flashcard for edit: ", error);
        }
      );
  }

  validationFlashcard() {
    const question: HTMLInputElement | null = document.getElementById("question") as HTMLInputElement;
    const answer: HTMLInputElement | null = document.getElementById("answer") as HTMLInputElement;

    const validationQuestion: HTMLElement | null = document.getElementById("validationQuestion");
    const validationAnswer: HTMLElement | null = document.getElementById("validationAnswer");

    if (validationQuestion) {
      validationQuestion.style.display = "none";
    }

    if (validationAnswer) {
      validationAnswer.style.display = "none";
    }

    if (validationQuestion && question && validationAnswer && answer) {
      question.addEventListener("input", () => {
        validationQuestion.style.display = "block"
      });
      answer.addEventListener("input", () => {
        validationAnswer.style.display = "block"
      })

      setTimeout(() => {
        validationAnswer.style.display = "block";
        validationQuestion.style.display = "block";
      }, 10000);
    }
  }
}
