import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentsState {
  comments: any;
}

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<any>) => {
      state.comments = action.payload;
    },

    addComment: (state, action: PayloadAction<any>) => {
      state.comments.push(action.payload);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
