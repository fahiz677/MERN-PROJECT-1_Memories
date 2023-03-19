import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {

  try {
    const { data } = await api.fetchPosts();

    return data;

  } catch (error) {
    console.log(error.message);

    throw error;
  }

});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {

  try {
    const { data } = await api.createPost(post);

    return data;

  } catch (error) {
    console.log(error.massage);
  }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  try {
    const id = post._id;

    const { data } = await api.updatePost(id, post);

    return data;
  } catch (error) {
    console.log(error.massage);
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    const { data } = await api.deletePost(id);

    return data;
  } catch (error) {
    console.log(error.massage);
  }
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  try {

    const { data } = await api.likePost(id);

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
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(postData) {
        return {
          payload: {
            title: postData.title,
            message: postData.message,
            creator: postData.creator,
            tags: postData.tags,
            selectedFile: postData.selectedFile,
            likeCount: postData.likeCount,
            createdAt: postData.createdAt,
          },
        };
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
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log("likeUpdate could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectError = (state) => state.posts.error;
export const getPostsStatus = (state) => state.posts.status;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post._id === postId);

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
