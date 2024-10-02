import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CommentI } from '@/types';

interface CommentsStateI {
  comments: CommentI[];
}

const initialState: CommentsStateI = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentI[]>) => {
      state.comments = action.payload;
    },

    addComment: (state, action: PayloadAction<CommentI>) => {
      state.comments.push(action.payload);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
