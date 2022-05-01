export interface  User {
  id: string;
  path: string;
  displayNamae: string;
  updateAt: Date;
  createdAt: Date;
  isDeleted: string;
  userId: string;
  rolse: string[];
  flagCount: number;
  hasFlag: boolean
}

export default User