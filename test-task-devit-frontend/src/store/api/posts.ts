import { api } from './index';

export interface Posts {
  data: Post[];
  total: number;
}

export interface Post {
  id: number;
  description: string;
  title: string;
  pubDate: string;
  link: string;
  categories: [];
  authorId: number;
}

export const postsApi = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<Posts, any>({
      query: ({ page, itemsPerPage, order, search }) =>
        `post/get-all?page=${page}&itemsPerPage=${itemsPerPage}&order=${order}&search=${search}`,
      providesTags: ['Post']
    }),
    getPost: builder.query<Post, number>({
      query: id => `post/${id}`,
      providesTags: ['Post']
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: `post`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Post']
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query(data) {
        return {
          url: `post/${data.id}`,
          method: 'PATCH',
          body: data
        };
      },
      invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation<Post, any>({
      query: id => ({
        url: `post/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
});

export const { useGetPostQuery, useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation } =
  postsApi;
