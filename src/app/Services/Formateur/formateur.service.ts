import { Injectable } from '@angular/core';
import { AppService } from '../app/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  selectedCourse!: any;

  getCourse(idFormateur: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/getByFormateur/" + idFormateur;
    return this._http.get<any>(url);
  }

  addCourse(data: any, idSujet: number, idFormateur: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/cours/create/" + idSujet + "/" + idFormateur;
    return this._http.post<any>(url, data);
  }

  getChapitreByIdCours(id: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/chapitre/getbyidcours/" + id;
    return this._http.get<any>(url);
  }

  addChap(data: any, idcours: number): Observable<any> {
    let url = this._appService.baseUrl + "/api/chapitre/create/" + idcours;
    return this._http.post<any>(url, data);
  }

}
