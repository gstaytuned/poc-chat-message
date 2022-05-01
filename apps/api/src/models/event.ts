import Message from './messages'
import User from './user'

export interface Event {
  requestId: string;
  webhookId: string;
  event: string;
  data: { 
    messages: Message[];
    users: User[]
  }
}


export default Event