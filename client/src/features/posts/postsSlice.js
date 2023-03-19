
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {

  try {

    const { data } = await api.fetchPosts();
console.log(data);
    return data;

  } catch (error) {

    console.log(error.message);

    throw error;

  }

});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {

    try {
        
        const { data } = await api.createPost(post);

        return data; 

    } catch (error) {

        console.log(error.massage);
        
    }

    
  });

const initialState = {
  posts: [],
  status: "idle",
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(postData) {
        return {
          payload :{
          title: postData.title,
          message: postData.message,
          creator: postData.creator,
          tags:postData.tags ,
          selectedFile:postData.selectedFile ,
          likeCount: postData.likeCount ,
          createdAt:postData.createdAt 
          }
        }
        },
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
       
        
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectError = (state) => state.posts.error;
export const getPostsStatus = (state) => state.posts.status;


export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;


