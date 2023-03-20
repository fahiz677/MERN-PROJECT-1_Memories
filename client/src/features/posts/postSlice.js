import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";
// import Post from '../../../../frontend/src/components/Posts/Post/Post';
// import { createPost } from '../../../../server/controllers/posts';
// import { updatePost, deletePost } from '../../../../frontend/src/features/posts/postService';
// import { likePost } from '../../../../frontend/src/features/posts/postSlice';
// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {

//   try {
//     const { data } = await api.fetchPosts();
   
//     return data;

//   } catch (error) {
//     console.log(error.message);

//     throw error;
//   }

// });

// export const createPost = createAsyncThunk("posts/createPost", async (post) => {

//   try {
//     const { data } = await api.createPost(post);

//     return data;

//   } catch (error) {
//     console.log(error.massage);
//   }
// });

// export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
//   try {
//     const id = post._id;

//     const { data } = await api.updatePost(id, post);

//     return data;
//   } catch (error) {
//     console.log(error.massage);
//   }
// });

// export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
//   try {
//     const { data } = await api.deletePost(id);

//     return data;
//   } catch (error) {
//     console.log(error.massage);
//   }
// });

// export const likePost = createAsyncThunk("posts/likePost", async (id) => {
//   try {

//     const { data } = await api.likePost(id);

//     return data;
//   } catch (error) {
//     console.log(error.massage);
//   }
// });

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }


// Create new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, thunkAPI) => {
    try {
      
      const {data}=await postService.createPost(post)
      return  data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


  // Get user posts
 export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, thunkAPI) => {
      try {
        const { data } =await postService.fetchPosts()
        return  data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  // Update The  post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post, thunkAPI) => {
    try {
      const id = post._id;
      const {data}=await postService.updatePost(id,post)
      return  data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      
      const { data } = await postService.deletePost(id)
      return  data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


// Like user post
export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id, thunkAPI) => {
    try {
      
      const { data } = await postService.likePost(id)
      return  data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

  export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
        })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })  
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?._id) console.log("Update could not complete");
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.isLoading = false
        state.isSuccess = true
        state.posts = [...posts, action.payload];
        console.log(state.posts);
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        )
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }) 
      .addCase(likePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (!action.payload?._id) console.log("likeUpdate could not complete");
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.isLoading = false
        state.isSuccess = true
        state.posts = [...posts, action.payload];
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      });  
        
    },
  })
  


export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) => state.posts.posts.find((post) => post._id === postId);

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
