import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const postsSlice = createSlice({

  name: 'posts',

  initialState,

  reducers: {

    fetchAll: (state, action) => {

      return action.payload;

    },
    create: (state,action) => {

      return [...state,action.payload]

    }

  }

});

export const { fetchAll, create } = postsSlice.actions;

export default postsSlice.reducer;
