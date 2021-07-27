import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntroClipService {
  private GETCLIPSCONNECTION = '/api/getaudioclips'

  constructor(private http: HttpClient) { }

  getAudioClips(): Observable<any> {
    return this.http.get<any>(this.GETCLIPSCONNECTION);
  }
}
