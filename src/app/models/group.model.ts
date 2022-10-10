export interface Group {
  groupName : string
  userList : User[]
  messageList : Message[]
}

export interface User {
  username : string
  connectionId : string
}

export interface Message {
  author : string
  content : string
}
