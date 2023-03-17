import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const { data } = await api.fetchPosts();

         return data;
    } catch (error) {
        console.log(error.massage);
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