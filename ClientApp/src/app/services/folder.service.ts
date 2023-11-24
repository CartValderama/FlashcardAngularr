import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IFolder } from "../models/folder";

@Injectable({
  providedIn: "root"
})

export class FolderService {
  private baseUrl = "api/folder/";

  constructor(private _http: HttpClient) { }

  getFolders(): Observable<IFolder[]> {
    return this._http.get<IFolder[]>(this.baseUrl);
  }

  createFolder(newFolder: IFolder): Observable<any> {
    const createUrl = 'api/folder/create';
    return this._http.post<any>(createUrl, newFolder);
  }

  getFolderById(folderId: number): Observable<any> {
    const url = `${this.baseUrl}/${folderId}`;
    return this._http.get(url);
  }

  updateFolder(folderId: number, newFolder: any): Observable<any> {
    const url = `${this.baseUrl}/update/${folderId}`;
    newFolder.FolderId = folderId;
    return this._http.put<any>(url, newFolder);
  }

  deleteItem(folderId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${folderId}`;
    return this._http.delete(url);
  }
}
