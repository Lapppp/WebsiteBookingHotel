// comment.model.ts
export interface Comment {
  Id: number;
  CommentText: string;
  CreatedAt: string;
  Image: string | null;
  Status: string;
  UserID: string;
  HotelID: number;
  ParentCommentID: number | null;
  ChildComments: Comment[];
  hotelName?: string;
  userName?: string;
}
