import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environment';

const headers = new HttpHeaders({
  'content-type' : 'application/json',
  'Acess-Control-Allow-Origin':'*'
})

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http : HttpClient) {  }


  httpGet(url :string)
  {
     return this.http.get(`${baseUrl}${url}` ,{headers : headers})
  }

  httpPost(url : string , data : any)
  {
    return this.http.post(`${baseUrl}${url}` ,data )
  }

  httpPut(url: string , data : any)
  {
    return this.http.put(`${baseUrl}${url}` ,data)
  }

  httpDelete( url : string)
  {
    return this.http.delete(`${baseUrl}${url}` )
  }
}

