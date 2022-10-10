import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, Message } from '../models/group.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url : string = "https://localhost:7263/api/chat"
  constructor(
    private client : HttpClient
  ) { }

  getMessage(): Observable<Message[]> {
    return this.client.get<Message[]>(this.url)
  }

  getGroupList() : Observable<Group[]> {
    return this.client.get<Group[]>(this.url+"/group")
  }
}
