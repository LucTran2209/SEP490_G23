export interface FeedBackInputDto{
    productId: string;
    userName: string;
    rating: number;
    comment: string;
}
export interface FeedbackOutputDto{
    id: string;
    productId: string;
    rating: number;
    userName: string;
    comment: string;
}