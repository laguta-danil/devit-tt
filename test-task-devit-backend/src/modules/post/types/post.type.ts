export interface IPost {
  readonly author: string;
  readonly authorId: string;
  readonly title: string;
  readonly description: string;
  readonly link: string;
  readonly pubDate: Date;
  readonly imageUrl: string;
  readonly categories: string[] | [];
}
