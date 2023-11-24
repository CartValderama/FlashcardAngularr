import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IDeck } from "../models/deck";
import { IFlashcard } from "../models/flashcard";
import { FlashcardService } from "../services/flashcard.service";
import { DeckService } from "../services/deck.service";

@Component({
  selector: "app-flashcard-flashcardform",
  templateUrl: "./flashcardtwo.component.html"
})

export class FlashcardtwoComponent implements OnInit {
  decks: IDeck[] = [];
  randomQuestions: IFlashcard[] = []
  total: number = 0;
  correctMatches: number = 0;
  randomAnswers: IFlashcard[] = []
  questionStatus: boolean = false;
  answerStatus: boolean = false;
  deck: IDeck = {
    DeckId: 0,
    DeckName: "",
    DeckDescription: "",
    CreationDate: "",
    FolderId: 0
  };
  flashcards: IFlashcard[] = []
  flashcardQuestion: IFlashcard = {
    FlashcardId: 0,
    Question: "",
    Answer: "",
    CreationDate: "",
    DeckId: 0
  }
  flashcardAnswer: IFlashcard = {
    FlashcardId: 0,
    Question: "",
    Answer: "",
    CreationDate: "",
    DeckId: 0
  }
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _flashcardService: FlashcardService,
    private _deckService: DeckService) {
  }
  // Function to update the CreationDate attribute to store only the date part
  updateCreationDateDeck(deck: IDeck): IDeck {
    const datePart = deck.CreationDate.split('T')[0];
    deck.CreationDate = datePart;
    return deck;
  }

  getFlashcards(deckId: number): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._flashcardService.getFlashcardsByDeckId(deckId)
      .subscribe(data => { // subscribe() used to receive the data when the response is received
        this.flashcards = data;
        this.randomQuestions = this.shuffleFlashcard(this.flashcards);
        this.randomAnswers = this.shuffleFlashcard(this.flashcards);
        this.flashcards.forEach(flashcard => {
          this.total++;
        })
      });
  }

  getDecks(folderId: number): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._deckService.getDecksByFolderId(folderId)
      .subscribe(data => { // subscribe() used to receive the data when the response is received
        this.decks = data;
        this.decks.forEach(deck => {
          this.updateCreationDateDeck(deck)
        })
      });
  }

  getDeck(deckId: number): void {
    this._deckService.getDeckById(deckId)
      .subscribe(data => {
        this.deck = data;
        this.updateCreationDateDeck(this.deck);
      })
  }

  shuffleFlashcard<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }

  checkQuestion(selectedFlashcard: IFlashcard): void {
    const allQuestions = document.querySelectorAll('.question') as NodeListOf<HTMLElement>;
    this.questionStatus = true;
    allQuestions.forEach((question: HTMLElement) => {
      question.style.background = "lightblue";
    });
    const clickedQuestion = document.getElementById(selectedFlashcard.FlashcardId + "_question") as HTMLElement;
    if (clickedQuestion) {
      clickedQuestion.style.background = "green";
    }
    this.flashcardQuestion = selectedFlashcard;

    if (this.questionStatus && this.answerStatus) {
      this.checker();
      this.questionStatus = false;
      this.answerStatus = false;
    }
  }

  checkAnswer(selectedFlashcard: IFlashcard): void {
    const allAnswers = document.querySelectorAll('.answer') as NodeListOf<HTMLElement>;
    this.answerStatus = true;
    allAnswers.forEach((answer: HTMLElement) => {
      answer.style.background = "lightseagreen";
    });

    const clickedAnswer = document.getElementById(selectedFlashcard.FlashcardId + "_answer") as HTMLElement;
    if (clickedAnswer) {
      clickedAnswer.style.background = "green";
    }
    this.flashcardAnswer = selectedFlashcard;
    if (this.questionStatus && this.answerStatus) {
      this.checker();
      this.questionStatus = false;
      this.answerStatus = false;
    }
  }

  checker(): void {
    const question = document.getElementById(this.flashcardQuestion.FlashcardId + "_question") as HTMLElement;
    const answer = document.getElementById(this.flashcardAnswer.FlashcardId + "_answer") as HTMLElement;
    const progressBar = document.getElementById('progress-bar2') as HTMLElement;
    const instruction = document.getElementById('ins') as HTMLElement;

    if (this.flashcardQuestion.FlashcardId == this.flashcardAnswer.FlashcardId) {
      question.style.display = 'none';
      answer.style.display = 'none';

      instruction.innerHTML = "Correct!!";
      setTimeout(() => {
        instruction.innerHTML = "Match the correct Questions and Answers";
      }, 1000);

      this.correctMatches++;
      const maxMatches = this.total;
      const progress = (this.correctMatches / maxMatches) * 100;
      progressBar.style.width = progress + '%';
      progressBar.setAttribute('aria-valuenow', progress + "");

      if (this.correctMatches == maxMatches) {
        const finishMessage = document.getElementById('game-finish-message') as HTMLElement;
        finishMessage.style.display = 'block';
      }

    } else {
      instruction.innerHTML = "WRONG MATCH";
      question.style.background = "red";
      answer.style.background = "red";

      setTimeout(() => {
        answer.style.background = 'lightseagreen';
        question.style.background = "lightblue";
      }, 200);
      setTimeout(() => {
        instruction.innerHTML = "Match the correct Questions and Answers";
      }, 1000);
    } 
  }

  restartMatch() {
    location.reload();
  }

  return() {
    if (this.deck.FolderId == null) {
      this._router.navigate(["/library"]);
    } else {
      this._router.navigate(["/folder/" + this.deck.FolderId]);
    }
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = this.deck.DeckId = + params["id"]
      this.getDeck(id);
      this.getFlashcards(id);
    })


  }
}
