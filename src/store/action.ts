import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('сities/changeCity');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAvtorization');
export const setError = createAction<string | null>('сities/setError');
