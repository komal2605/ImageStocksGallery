import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Firestore from "../../handlers/firestore";
import Storage from "../../handlers/storage";

const { addNewDoc } = Firestore;
const { uploadMedia, downloadMedia } = Storage;

const photos = [];
const initialState = {
  items: photos,
  dbData: photos,
  count: photos.length,
  inputs: { title: null, file: null, path: null },
  isCollapsed: true,
  loading: false,
  dataLoading: false,
  userStockCount: 0,
};

export const fetchData = createAsyncThunk(
  "upload/fetchItems",
  async (_, { dispatch }) => {
    try {
      const items = await Firestore.getDocs("stocks");
      dispatch(setItems({ items: items, data: items }));
    } catch (e) {
      console.log(e);
    }
  }
);
export const handleUploadMedia = createAsyncThunk(
  "uploadMedia/uploadImage",
  async ({ inputs, userName, uploadFileDemo }, { dispatch }) => {
    try {
      // debugger;
      const data = { ...inputs, fileObj: uploadFileDemo };
      const uploadURL = await uploadMedia(data);
      const downloadedURL = await downloadMedia(uploadURL);
      await addNewDoc(
        { ...inputs, path: downloadedURL, user: userName.toLowerCase() },
        "stocks"
      );
      dispatch(fetchData());
      dispatch(setCollaped({ bool: true }));
    } catch (e) {
      console.log(e);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setItem: (state, action) => {
      return {
        ...state,
        items: [state.inputs, ...state.items],
        dbData: [state.inputs, ...state.items],
        count: state.items.length + 1,
        inputs: { title: null, file: null, path: null },
      };
    },
    setItems: (state, action) => {
      return {
        ...state,
        items: action.payload.items,
        dbData: action.payload.data,
      };
    },
    setInputs: (state, action) => {
      state.inputs = { ...state.inputs, ...action.payload };
    },
    setCollaped: (state, action) => {
      state.isCollapsed = action.payload.bool;
    },
    setSearchedArray: (state, action) => {
      const input = action.payload.input;
      if (input === "" || !!input) {
        state.items = state.dbData;
      } else {
        const searchInput = input.toLowerCase();
        state.items = state.dbData.filter((item) =>
          item.title.toLowerCase().includes(searchInput)
        );
      }
    },
    setUserStockCount: (state, action) => {
      state.userStockCount = action.payload.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.dataLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.dataLoading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.dataLoading = false;
        console.log(action.error.message);
      })
      .addCase(handleUploadMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleUploadMedia.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleUploadMedia.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });
  },
});

export const {
  setItem,
  setItems,
  setInputs,
  setCollaped,
  setSearchedArray,
  setUserStockCount,
} = uploadSlice.actions;
export const uploadState = (state) => state.upload;
export default uploadSlice.reducer;
