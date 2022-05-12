import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITypes } from 'src/shared/models/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor(
    private http: HttpClient
  ) { }

  getTypes(): Observable<ITypes[]> {
    return this.http.get<ITypes[]>(`${environment.apiUrl}/Types`);
  }
}
