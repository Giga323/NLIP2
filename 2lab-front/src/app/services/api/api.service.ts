import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageProbability } from '../../interfaces/languageProbabilityInterface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  postFile(method: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return this.http.post<LanguageProbability>(`http://localhost:3000/doc/post?method=${method}`, formData)
  }
}
