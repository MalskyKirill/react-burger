import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

const initialState = {
  user: null,
  accessToken: '',
  refreshToken: '',
  status: 'idle',
  error: null,
  success: false,
};

//асинхронный санк для регистрации юзера
export const createUser = createAsyncThunk(
  '@@auth/createUser',
  async ({ name, email, password }) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    };

    const res = await api.addUser(request);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

//асинхронный санк для авторизации юзера
export const loginUser = createAsyncThunk(
  '@@auth/loginUser',
  async ({ email, password }) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const res = await api.authUser(request);
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'received';
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'received';
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        }
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
  },
});

export const authReducer = authSlice.reducer;

// selectors
export const selectUser = (state) => state.auth.user;
