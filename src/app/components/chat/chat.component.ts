import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

import * as signalr from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

   url : string = "https://localhost:7263/chathub";
  //url : string ="http://tbchat.somee.com/chathub";

  hub! : signalr.HubConnection

  messageList : Message[] = []
  newmessage! : string
  author! : string
  constructor(
    private chatService : ChatService
  ) { }

  ngOnInit(): void {
    //Création de l'objet permettant la connexion
    this.hub = new signalr.HubConnectionBuilder().withUrl(this.url).build()

    //Ouverture de la connexion avec gestion erreur evéntuelle
    this.hub.start().then(() => {
      this.chatService.getMessage().subscribe({
        next : (data : Message[]) => {
          console.log("Connexion Ok")
          this.messageList = data
        }
      })
      })
      .catch((error) => console.log(error))

    //Abonnnement à l'évènement "receiveMessage" + quoi faire quand il est déclenché
    this.hub.on("receiveMessage", (data : Message) => this.messageList.push(data))
  }

  sendMessage() {
    this.hub.send("SendMessage", {author :  this.author, content : this.newmessage})
    this.newmessage = ""
  }

}
//npm install @microsoft/signalr --save

export interface Message {
  author : string
  content : string
}
