import {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
  getCurrentUser,
  updateCurrentUser,
} from './auth-slice';

global.fetch = jest.fn();

describe('createUser', () => {
  it('should createUser with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          user: { email: 'kirill@mail.ru', name: 'kirill' },
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        }),
    });

    const dispatch = jest.fn();

    const thunk = createUser({
      email: 'kirill@mail.ru',
      name: 'kirill',
      password: 'qwerty',
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(createUser.pending().type);
    expect(end[0].type).toBe(createUser.fulfilled().type);
    expect(end[0].payload.user).toEqual({
      email: 'kirill@mail.ru',
      name: 'kirill',
    });
    expect(end[0].payload.refreshToken).toBe('refreshToken');
    expect(end[0].payload.accessToken).toBe(
      'accessToken'
    );
  });

  it('should createUser with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = createUser({
      email: 'kirill@mail.ru',
      name: 'kirill',
      password: 'qwerty',
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(createUser.pending().type);
    expect(end[0].type).toBe(createUser.rejected().type);
  })
});

describe('loginUser', () => {
  it('should loginUser with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          user: { email: 'kirill@mail.ru', name: 'kirill' },
          accessToken: 'accessToken',
          refreshToken: 'refreshToken',
        }),
    });

    const dispatch = jest.fn();

    const thunk = loginUser({
      email: 'kirill@mail.ru',
      password: 'qwerty',
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(loginUser.pending().type);
    expect(end[0].type).toBe(loginUser.fulfilled().type);
    expect(end[0].payload.user).toEqual({
      email: 'kirill@mail.ru',
      name: 'kirill',
    });
    expect(end[0].payload.refreshToken).toBe('refreshToken');
    expect(end[0].payload.accessToken).toBe(
      'accessToken'
    );
  });

  it('should loginUser with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = loginUser({
      email: 'kirill@mail.ru',
      password: 'qwerty',
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(loginUser.pending().type);
    expect(end[0].type).toBe(loginUser.rejected().type);
  })
});

describe('forgotPassword', () => {
  it('should forgotPassword with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "success",
          success: true,
        }),
    });

    const dispatch = jest.fn();

    const thunk = forgotPassword({
      email: 'kirill@mail.ru',
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(forgotPassword.pending().type);
    expect(end[0].type).toBe(forgotPassword.fulfilled().type);
    expect(end[0].payload.message).toBe('success');
  });

  it('should forgotPassword with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = forgotPassword({
      email: 'kirill@mail.ru',
      password: 'qwerty',
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(forgotPassword.pending().type);
    expect(end[0].type).toBe(forgotPassword.rejected().type);
  })
});

describe('resetPassword', () => {
  it('should resetPassword with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "success",
          success: true,
        }),
    });

    const dispatch = jest.fn();

    const thunk = resetPassword({
      password: "password",
      token: "secretCode",
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(resetPassword.pending().type);
    expect(end[0].type).toBe(resetPassword.fulfilled().type);
    expect(end[0].payload.message).toBe('success');
  });

  it('should resetPassword with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = resetPassword({
      password: "password",
      token: "secretCode",
    });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(resetPassword.pending().type);
    expect(end[0].type).toBe(resetPassword.rejected().type);
  })
});

describe('logoutUser', () => {
  it('should logoutUser with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          message: "success",
          success: true,
        }),
    });

    const dispatch = jest.fn();

    const thunk = logoutUser();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(logoutUser.pending().type);
    expect(end[0].type).toBe(logoutUser.fulfilled().type);
    expect(end[0].payload.message).toBe('success');
  });

  it('should logoutUser with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = logoutUser();

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(logoutUser.pending().type);
    expect(end[0].type).toBe(logoutUser.rejected().type);
  })
});

describe('getCurrentUser', () => {
  it('should getCurrentUser with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          user: { email: "kirill@mail.ru", name: "kirill" },
          success: true,
        }),
    });

    const dispatch = jest.fn();

    const thunk = getCurrentUser({accessToken: 'accessToken'});

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(getCurrentUser.pending().type);
    expect(end[0].type).toBe(getCurrentUser.fulfilled().type);
    expect(end[0].payload.user).toEqual({ email: "kirill@mail.ru", name: "kirill" });
  });

  it('should getCurrentUser with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = getCurrentUser({accessToken: 'accessToken'});

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(getCurrentUser.pending().type);
    expect(end[0].type).toBe(getCurrentUser.rejected().type);
  })
});

describe('updateCurrentUser', () => {
  it('should updateCurrentUser with resolved responce', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          user: { email: "kirill@mail.ru", name: "kirill", password: "qwerty" },
          success: true,
        }),
    });

    const dispatch = jest.fn();

    const thunk = updateCurrentUser({ email: "kirill@mail.ru", name: "kirill", password: "qwerty" });

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(updateCurrentUser.pending().type);
    expect(end[0].type).toBe(updateCurrentUser.fulfilled().type);
    expect(end[0].payload.user.email).toBe("kirill@mail.ru");
    expect(end[0].payload.user.name).toBe("kirill");
  });

  it('should updateCurrentUser with resolved rejected', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();

    const thunk = updateCurrentUser({accessToken: 'accessToken'});

    await thunk(dispatch);

    const { calls } = dispatch.mock;
    const [start, end] = calls;

    expect(start[0].type).toBe(updateCurrentUser.pending().type);
    expect(end[0].type).toBe(updateCurrentUser.rejected().type);
  })
});
