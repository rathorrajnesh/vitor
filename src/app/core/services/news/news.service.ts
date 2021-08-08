import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { newsUrl } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  fetchAllnews(params){
    const anguments = this.appendParams(params);
    return this.httpClient.get(`${environment.apiUrl}${newsUrl}?access_key=${environment.mediastackAccessKey}&${anguments}`);
  }

  appendParams(obj){
   return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
  }
}
