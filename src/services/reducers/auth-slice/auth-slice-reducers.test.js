import {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getCurrentUser,
  updateCurrentUser,
  authReducer,
  initialState
} from './auth-slice';

describe('authSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = authReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should change status with "createUser.pending" action', () => {
    const state = authReducer(initialState, createUser.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "createUser.fulfilled" action', () => {
    const state = authReducer(initialState, createUser.fulfilled({
      user: { email: "kirill@mail.ru", name: "kirill" },
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      success: true,
    }));


    expect(state).toEqual({
      user: {
        email: 'kirill@mail.ru',
        name: 'kirill',
      },
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      status: 'received',
      error: null,
      success: true,
      isAuthChecked: true,
    })
  });
  it('should change status with "createUser.rejected" action', () => {
    const state = authReducer(initialState, createUser.rejected());

    expect(state.status).toBe('rejected');
  });

  it('should change status with "loginUser.pending" action', () => {
    const state = authReducer(initialState, loginUser.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "loginUser.fulfilled" action', () => {
    const state = authReducer(initialState, loginUser.fulfilled({
      success: true,
      user: { email: 'kirill@mail.ru', name: 'kirill' },
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    }));


    expect(state).toEqual({
      user: {
        email: 'kirill@mail.ru',
        name: 'kirill',
      },
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      status: 'received',
      error: null,
      success: true,
      isAuthChecked: true,
    })
  });
  it('should change status with "loginUser.rejected" action', () => {
    const state = authReducer(initialState, loginUser.rejected());

    expect(state.status).toBe('rejected');
  });

  it('should change status with "forgotPassword.pending" action', () => {
    const state = authReducer(initialState, forgotPassword.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "forgotPassword.fulfilled" action', () => {
    const state = authReducer(initialState, forgotPassword.fulfilled());


    expect(state.status).toBe('received')
  });
  it('should change status with "forgotPassword.rejected" action', () => {
    const state = authReducer(initialState, forgotPassword.rejected());

    expect(state.status).toBe('rejected');
  });

  it('should change status with "resetPassword.pending" action', () => {
    const state = authReducer(initialState, resetPassword.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "resetPassword.fulfilled" action', () => {
    const state = authReducer(initialState, resetPassword.fulfilled());

    expect(state.status).toBe('received')
  });
  it('should change status with "resetPassword.rejected" action', () => {
    const state = authReducer(initialState, resetPassword.rejected());

    expect(state.status).toBe('rejected');
  });

  it('should change status with "logoutUser.pending" action', () => {
    const state = authReducer(initialState, logoutUser.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "logoutUser.fulfilled" action', () => {
    const state = authReducer(initialState, logoutUser.fulfilled());

    expect(state.status).toBe('received')
    expect(state.user).toBeNull();
    expect(state.accessToken).toBe('')
    expect(state.refreshToken).toBe('')
  });
  it('should change status with "logoutUser.rejected" action', () => {
    const state = authReducer(initialState, logoutUser.rejected());

    expect(state.status).toBe('rejected');
  });

  it('should change status with "getCurrentUser.pending" action', () => {
    const state = authReducer(initialState, getCurrentUser.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "getCurrentUser.fulfilled" action', () => {


    const state = authReducer(initialState, getCurrentUser.fulfilled({ user: { email: 'kirill@mail.ru', name: 'kirill' } }));

    expect(state.status).toBe('received')
    expect(state.user).toEqual({ email: 'kirill@mail.ru', name: 'kirill' })


  });
  it('should change status with "getCurrentUser.rejected" action', () => {
    const state = authReducer(initialState, getCurrentUser.rejected());

    expect(state.status).toBe('rejected');
  });

  it('should change status with "updateCurrentUser.pending" action', () => {
    const state = authReducer(initialState, updateCurrentUser.pending());

    expect(state.status).toBe('loading');
  });
  it('should change status with "updateCurrentUser.fulfilled" action', () => {


    const state = authReducer(initialState, updateCurrentUser.fulfilled({ user: { email: 'kirill@mail.ru', name: 'kirill' } }));

    expect(state.status).toBe('received')
    expect(state.user).toEqual({ email: 'kirill@mail.ru', name: 'kirill' })


  });
  it('should change status with "updateCurrentUser.rejected" action', () => {
    const state = authReducer(initialState, updateCurrentUser.rejected());

    expect(state.status).toBe('rejected');
  });
})
