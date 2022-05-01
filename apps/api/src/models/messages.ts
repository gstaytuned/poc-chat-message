export interface Message {
  type: string,
  tags: string[],
  isDeleted: boolean,
  createdAt: Date,
  editedAt: Date,
  channelSegment: number,
  updatedAt: Date,
  childrenNumber: number,
  data: {
      text: string;
  },
  channelId: string,
  userId: string,
  messageId: string,
  flagCount: number,
  hashFlag: boolean,
  mentionees: string[],
  reactionsCount: number,
}

export default Message
