import { Group } from './../../models/group.model';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

import * as signalr from '@microsoft/signalr';
import { Message } from 'src/app/models/group.model';

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
  groupList : Group[] = []
  newmessage! : string
  author! : string
  private _groupname! : string
  get groupname() : string {
    return this._groupname
  }
  set groupname(value : string) {
    this._groupname = value

  }

  joinedGroup :string[] = []

  constructor(
    private chatService : ChatService
  ) { }

  ngOnInit(): void {
    //Création de l'objet permettant la connexion
    this.hub = new signalr.HubConnectionBuilder().withUrl(this.url).build()

    //Ouverture de la connexion avec gestion erreur evéntuelle
    this.hub.start().then(() => {
      this.chatService.getGroupList().subscribe({
        next : (data : Group[]) => {
          console.log("Connexion Ok")
          this.groupList = data
        }
      })
      })
      .catch((error) => console.log(error))

    //Abonnnement à l'évènement "receiveMessage" + quoi faire quand il est déclenché
    //this.hub.on("receiveMessage", (data : Message) => this.messageList.push(data))
  }

  // sendMessage() {
  //   this.hub.send("SendMessage", {author :  this.author, content : this.newmessage})
  //   this.newmessage = ""
  // }

  sendToGroup() {
    this.hub.send("SendToGroup", {author : this.author, content : this.newmessage}, this.groupname)
    this.newmessage = ""
  }

  addToGroup(groupname : string) {
    this.hub.send("JoinGroup", groupname, this.author)
    this.joinedGroup.push(groupname);
    this.hub.on("to"+groupname, (data : Message) => {this.messageList.push(data)})
    //this.joinGroup()
  }
  joinGroup() {

   // this.hub.off("togroup")


  }

}
//npm install @microsoft/signalr --save

