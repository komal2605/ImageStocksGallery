import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase.config";

const Storage = {
  uploadMedia: async (media) => {
    try {
      const mediaRef = ref(storage, `images/${media.title}`);
      const snapshot = await uploadBytes(mediaRef, media.fileObj);
      return { path: snapshot.metadata.fullPath, name: media.title };
    } catch (e) {
      console.log(e);
    }
  },
  downloadMedia: async (media) => {
    try {
      const mediaRef = ref(storage, media.path);
      const mediaURL = await getDownloadURL(mediaRef);
      return mediaURL;
    } catch (e) {
      console.log(e);
    }
  },
};

export default Storage;
