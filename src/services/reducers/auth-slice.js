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

//ассинхронный санк для запроса на востановление пароля
export const forgotPassword = createAsyncThunk(
  '@@auth/forgotPassword',
  async ({ email }) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    };
    const res = await api.forgotUserPassword(request);
    return res;
  }
);

//ассинхронный санк для запроса на сброс пароля
export const resetPassword = createAsyncThunk(
  '@@auth/resetPassword',
  async ({password, token}) => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token
      }),
    };
    const res = await api.resetUserPassword(request);
    return res;
  }
)

export const logoutUser = createAsyncThunk(
  '@@auth/logoutUser',
  async () => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    }

    const res = await api.outUser(request);
    return res;
  }
)

export const updateAccessToken = createAsyncThunk(
  '@@auth/updateAccessToken',
  async () => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    }

    const res = await api.getAccessToken(request);
    return res;

  }
)

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
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(forgotPassword.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log(action)
        state.status = 'received';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'received';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(logoutUser.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'received';

        state.user = null;
        state.accessToken = '';
        state.refreshToken = '';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })

      .addCase(updateAccessToken.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateAccessToken.fulfilled, (state, action) => {
        state.status = 'received';

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(updateAccessToken.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
  },
});

export const authReducer = authSlice.reducer;

// selectors
export const selectUser = (state) => state.auth.user;
