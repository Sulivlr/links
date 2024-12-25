import {createAsyncThunk} from '@reduxjs/toolkit';
import {Link, LinkMutation} from '../types';
import axiosApi from '../axiosApi';

export const createLink = createAsyncThunk<Link, LinkMutation>(
  'links/create',
  async (apiLink) => {
    const {data: link} = await axiosApi.post('/links', apiLink);
    return link
  },
);

export const fetchShortLink = createAsyncThunk<Link, string>(
  'links/fetchShort',
  async (id) => {
    const {data : shortLink} = await axiosApi.get<Link>(`links/${id}`);
    return shortLink;
  },
);