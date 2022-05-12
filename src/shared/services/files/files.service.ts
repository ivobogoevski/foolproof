import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IFile } from 'src/shared/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }

  getFiles(): Observable<IFile[]> {
    return this.http.get<IFile[]>(`${environment.apiUrl}/Files`);
  }
}
