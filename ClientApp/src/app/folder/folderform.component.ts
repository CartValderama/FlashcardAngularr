import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FolderService } from "../services/folder.service";

@Component({
  selector: "app-folder-folderform",
  templateUrl: "./folderform.component.html"
})

export class FolderformComponent {
  folderForm: FormGroup;
  isEditMode: boolean = false;
  folderId: number = -1;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _folderService: FolderService)
  {
    this.folderForm = _formbuilder.group({
      folderName: ["", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9a-zA-ZæøåÆØÅ. -]{2,15}$/)
      ]],
      folderDescription: ["", [Validators.maxLength(150)]],
    })
  }

  onSubmit() {
    const newFolder = this.folderForm.value;
    if (this.isEditMode) {
      this._folderService.updateFolder(this.folderId, newFolder)
        .subscribe(response => {
          if (response.success) {
            console.log(this.folderId)
            this._router.navigate(["/folder/" + this.folderId]);
          }
          else {
            console.log("Folder update failed");
          }
        })
    }
    else {
      this._folderService.createFolder(newFolder)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(["/library"]);
          }
          else {
            console.log("Folder creation failed");
          }
        });
    };
  }

  backToFolders() {
    if (this.isEditMode) {
      this._router.navigate(["/folder/" + this.folderId]);
    } else {
      this._router.navigate(["/library"]);
    }
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params["mode"] === "create") {
        this.isEditMode = false; // Create mode
      } else if (params["mode"] === "update") {
        this.isEditMode = true; // Edit mode
        console.log(params["id"]);
        this.folderId =+ params["id"];
        console.log(this.folderId);
        this.loadItemForEdit(this.folderId);
      }
    });
    this.validationFolder();
  }

  loadItemForEdit(folderId: number) {
    this._folderService.getFolderById(folderId)
      .subscribe(
        (folder: any) => {
          console.log("retrived folder: ", folder);
          this.folderForm.patchValue({
            folderName: folder.FolderName,
            folderDescription: folder.FolderDescription
          });
        },
        (error: any) => {
          console.error("Error loading folder for edit: ", error);
        }
      );
  }

  validationFolder() {
    const myInput: HTMLInputElement | null = document.getElementById("folderName") as HTMLInputElement;
    const validatationFolder: HTMLElement | null = document.getElementById("validatationFolder");
    if (validatationFolder) {
      validatationFolder.style.display = "none";
    }

    if (myInput && validatationFolder) {
      myInput.addEventListener("input", () => {
        validatationFolder.style.display = "block"
      });
      setTimeout(() => {
        validatationFolder.style.display = "block";
      }, 10000);
    }
  }
}
