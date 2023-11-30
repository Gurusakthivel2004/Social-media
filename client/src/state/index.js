import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  roomData: null,
  selectedUsername: null,
  selectedUserPicturePath: null,
  messageList: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = (state.mode === "light" ? "dark" : "light");
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setRoomData: (state, action) => {
      state.roomData = action.payload.roomData;
    },
    setUser: (state, action) => {
      state.selectedUsername = action.payload.name;
      state.selectedUserPicturePath = action.payload.picture;
    },
    setMessageList: (state, action) => {
      state.messageList = action.payload.messageList;
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setRoomData, setUser, setMessageList} = authSlice.actions;
export default authSlice.reducer;
