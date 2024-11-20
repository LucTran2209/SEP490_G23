export interface FeedBackInputDto{
    productId: string;
    userId: string;
    rating: number;
    comment: string;
}
export interface FeedbackOutputDto{
    id: string;
    productId: string;
    rating: number;
    userName: string;
    comment: string;
    users?: any;
    avatarPersonal?: string;
    createdDate?: string;
}
export interface FeedbackResultService {
    statusCode: number;
    message: string;
    data: FeedbackOutputDto[];
  }