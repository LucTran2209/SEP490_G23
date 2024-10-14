export interface PostOutputDto {
  postId: number;
  postName: string;
  postImg: string;
  authorName: string;
  authorAddress: string;
}
export interface PostResultService {
  statusCode: string;
  message: string;
  datas: {
    list: PostOutputDto[];
  };
}
