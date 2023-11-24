import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IFlashcard } from "../models/flashcard";

@Injectable({
  providedIn: "root"
})

export class FlashcardService {
  private baseUrl = "api/flashcard/";

  constructor(private _http: HttpClient) { }

  getFlashcards(): Observable<IFlashcard[]> {
    return this._http.get<IFlashcard[]>(this.baseUrl);
  }

  getFlashcardsByDeckId(deckId: number): Observable<IFlashcard[]> {
    const url = `${this.baseUrl}/bydeck/${deckId}`;
    return this._http.get<IFlashcard[]>(url);
  }

  getFlashcardById(flashcardId: number): Observable<any> {
    const url = `${this.baseUrl}/${flashcardId}`;
    return this._http.get(url);
  }

  createFlashcard(deckId: number, newFlashcard: IFlashcard): Observable<any> {
    // all flashcards are stored in deck#1 until routings are sorted
    const createUrl = `${this.baseUrl}/create/${deckId}`;
    return this._http.post<any>(createUrl, newFlashcard);
  }

  updateFlashcard(flashcardId: number, newFlashcard: any): Observable<any> {
    const url = `${this.baseUrl}/update/${flashcardId}`;
    newFlashcard.FlashcardId = flashcardId;
    return this._http.put<any>(url, newFlashcard);
  }

  deleteItem(flashcardId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${flashcardId}`;
    return this._http.delete(url);
  }
}
