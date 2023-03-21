
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'



// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



// LogIn user
export const signIn = createAsyncThunk('user/signIn', async (user, thunkAPI) => {
    try {

    const {result} = await authService.signin(user)

    return  result;
    } catch (error) {
      
      const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })


  // Regiser user
export const signUp = createAsyncThunk('user/signUp', async (user, thunkAPI) => {

  try {  
  const {result} = await authService.signUp(user)
  
  return  result
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||error.message ||error.toString()

    return thunkAPI.rejectWithValue(message)
  } 
})



  // Logout user
  export const logout = createAsyncThunk('user/logout', async () =>  await authService.logout())


  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(signIn.pending, (state) => {
          state.isLoading = true
        })
        .addCase(signIn.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(signIn.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(signUp.pending, (state) => {
          state.isLoading = true
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(signUp.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null
        })
    },
  })
  
  export const { reset } = authSlice.actions

  export default authSlice.reducer