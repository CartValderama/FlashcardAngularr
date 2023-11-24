import { Component, OnInit } from "@angular/core";
import { IFolder } from "../models/folder";
import { Router } from "@angular/router";
import { FolderService } from "../services/folder.service";
import { DeckService } from "../services/deck.service";
import { IDeck } from "../models/deck";


@Component({
  selector: "app-library-component",
  templateUrl: "./library.component.html"
})

export class LibraryComponent implements OnInit {
  viewTitle: string = "Table";
  private _listFilter: string = "";
  folders: IFolder[] = [];
  decks: IDeck[] = [];

  // injecting the HttpClient service into the component
  constructor(
    private _router: Router,
    private _folderService: FolderService,
    private _deckService: DeckService) { }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDecks = this.performFilterDeck(value);
    this.filteredFolders = this.performFilterFolder(value);
  }

  getFolders(): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._folderService.getFolders()
      .subscribe(data => { // subscribe() used to receive the data when the response is received 
        this.folders = data;
        this.filteredFolders = this.folders;
      });
  }

  filteredFolders: IFolder[] = [];
  performFilterFolder(filterBy: string): IFolder[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.folders.filter((folder: IFolder) =>
      folder.FolderName.toLocaleLowerCase().includes(filterBy));
  }


  getDecks(): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._deckService.getDecks()
      .subscribe(data => { // subscribe() used to receive the data when the response is received 
        this.decks = data;
        let decksNoFolder: IDeck[] = [];
        this.decks.forEach(function (deck) {
          if (deck.FolderId == null) {
            decksNoFolder.push(deck);
          }
        })
        this.decks = decksNoFolder;
        this.filteredDecks = this.decks;
      });
  }

  filteredDecks: IDeck[] = [];
  performFilterDeck(filterBy: string): IDeck[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.decks.filter((deck: IDeck) =>
      deck.DeckName.toLocaleLowerCase().includes(filterBy));
  }


  ngOnInit(): void {
    this.getFolders();
    this.getDecks();
  }
}
