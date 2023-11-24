import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { timeout } from "rxjs";
import { IDeck } from "../models/deck";
import { IFolder } from "../models/folder";
import { DeckService } from "../services/deck.service";
import { FolderService } from "../services/folder.service";

@Component({
  selector: "app-deck-deckform",
  templateUrl: "./deckform.component.html"
})

export class DeckformComponent {
  deckForm: FormGroup;
  isEditMode: boolean = false;
  hasFolder: boolean = false;
  deckId: number = -1;
  folders: IFolder[] = [];

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _deckService: DeckService,
    private _folderService: FolderService) {
    this.deckForm = _formbuilder.group({
      deckName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9a-zA-ZæøåÆØÅ. -]{2,15}$/)
      ]],
      deckDescription: ["", [Validators.maxLength(150)]],
      folderId: null,
    })
  }

  onSubmit() {
    if (!this.deckForm.invalid) {
      const newDeck = this.deckForm.value;
      if (this.isEditMode) {
        this._deckService.updateDeck(this.deckId, newDeck)
          .subscribe(response => {
            if (response.success) {
              this._router.navigate(["/deck/" + this.deckId]);
            }
            else {
              console.log("Deck update failed");
            }
          })
      }
      else {
        this._route.params.subscribe(params => {
          if (this.hasFolder) {
            this._deckService.createDeckInFolder(params["id"], newDeck)
              .subscribe(response => {
                if (response.success) {
                  this._router.navigate(["/folder/" + params["id"]]);
                }
                else {
                  console.log("Deck creation failed");
                }
              });
          } else {
            this._deckService.createDeck(newDeck)
              .subscribe(response => {
                if (response.success) {
                  if (newDeck.folderId == null) {
                    this._router.navigate(["/library"]);
                  } else {
                    this._router.navigate(["/folder/" + newDeck.folderId]);
                  }
                }
                else {
                  console.log("Deck creation failed");
                }
              });
          }
        })
      };
    }
  }

  createCheckFolderId() {
    const folderSelection: HTMLElement | null = document.getElementById("folderSelect");

    if (folderSelection) {
      if (this.hasFolder) {
        folderSelection.style.display = "none"
      }
    }
  }

  backToDecks() {
    this._route.params.subscribe(params => {
      const id = params["id"];
      if (id == "null") {
        this._router.navigate(["/library"]);
      } else {
        this._router.navigate(["/deck/" + id]);
      }
    });
  }

  getFolders(): void {
    // call to the server with the url "api/item/", expected return type is an IFolder array. This is also an observable return by the get
    this._folderService.getFolders()
      .subscribe(data => { // subscribe() used to receive the data when the response is received 
        this.folders = data;
      });
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params["mode"] === "create") {
        this.isEditMode = false; // Create mode
        if (params["id"] == "null") {
          this.hasFolder = false
        } else {
          this.hasFolder = true;
        }
      } else if (params["mode"] === "update") {
        this.isEditMode = true; // Edit mode
        this.deckId = +params["id"];
        this.loadItemForEdit(this.deckId);
      }
    });
    this.getFolders();
    this.createCheckFolderId();
    this.validationDeck()
  }

  loadItemForEdit(deckId: number) {
    this._deckService.getDeckById(deckId)
      .subscribe(
        (deck: any) => { 
          console.log("retrived deck: ", deck);
          this.deckForm.patchValue({
            deckName: deck.DeckName,
            deckDescription: deck.DeckDescription,
            folderSelection: deck.FolderId
          });
        },
        (error: any) => {
          console.error("Error loading deck for edit: ", error);
        }
      );
  }

  validationDeck() {
    const myInput: HTMLInputElement | null = document.getElementById("deckName") as HTMLInputElement;
    const validationDeck: HTMLElement | null = document.getElementById("validationDeck");
    if (validationDeck) {
      validationDeck.style.display = "none";
    }
    if (myInput && validationDeck) {
      myInput.addEventListener("input", () => {
        validationDeck.style.display = "block"
      });
      setTimeout(() => {
        validationDeck.style.display = "block";
      }, 10000);
    }
  }
}
