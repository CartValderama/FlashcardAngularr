import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IDeck } from "../models/deck";

@Injectable({
  providedIn: "root"
})

export class DeckService {
  private baseUrl = "api/deck/";

  constructor(private _http: HttpClient) { }

  getDecks(): Observable<IDeck[]> {
    return this._http.get<IDeck[]>(this.baseUrl);
  }

  getDecksByFolderId(folderId: number): Observable<IDeck[]> {
    const url = `${this.baseUrl}/byfolder/${folderId}`;
    return this._http.get<IDeck[]>(url);
  }

  getDeckById(deckId: number): Observable<any> {
    const url = `${this.baseUrl}/${deckId}`;
    return this._http.get(url);
  }

  createDeck(newDeck: IDeck): Observable<any> {
    const createUrl = `${this.baseUrl}/create`;
    return this._http.post<any>(createUrl, newDeck);
  }

  createDeckInFolder(folderId: number, newDeck: IDeck): Observable<any> {
    const createUrl = `${this.baseUrl}/create/${folderId}`;
    return this._http.post<any>(createUrl, newDeck);
  }

  updateDeck(deckId: number, newDeck: any): Observable<any> {
    const url = `${this.baseUrl}/update/${deckId}`;
    newDeck.DeckId = deckId;
    return this._http.put<any>(url, newDeck);
  }

  deleteItem(deckId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${deckId}`;
    return this._http.delete(url);
  }
}
