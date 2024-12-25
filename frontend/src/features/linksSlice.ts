import {Link} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createLink, fetchShortLink} from './linksThunks';

export interface LinkState {
  link: Link | null;
  isCreating: boolean;
  isFetching: boolean;
  shortLink: Link | null;
}

const initialState: LinkState = {
  link: null,
  isCreating: false,
  isFetching: false,
  shortLink: null,
}

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createLink.pending, (state) => {
      state.isCreating = true;
    }).addCase(createLink.fulfilled, (state, {payload: link}) => {
      state.isCreating = false;
      state.link = link;
    }).addCase(createLink.rejected, (state) => {
      state.isCreating = false;
    });

    builder.addCase(fetchShortLink.pending, (state) => {
      state.shortLink = null;
      state.isFetching = true;
    }).addCase(fetchShortLink.fulfilled, (state, {payload: shortLink}) => {
      state.shortLink = shortLink;
      state.isFetching = false;
    }).addCase(fetchShortLink.rejected, (state) => {
      state.isFetching = false;
    })
  },
  selectors: {
    selectLinkIsCreating: (state) => state.isCreating,
    selectShortLink: (state) => state.link,
    selectFetchShortLink: (state) => state.shortLink,
    selectFetching: (state) => state.isFetching,
  }
});

export const linkReducer = linkSlice.reducer;

export const {
  selectLinkIsCreating,
  selectShortLink,
} = linkSlice.selectors;