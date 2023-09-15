import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";
const Firestore = {
  addNewDoc: (...args) => {
    const [inputs, collectionName] = args;
    return new Promise(async (resolve) => {
      try {
        const currentDate = Timestamp.fromDate(new Date());
        await addDoc(collection(db, collectionName), {
          title: inputs.title,
          path: inputs.path,
          date: currentDate.toDate().toString(),
          userName: inputs.user,
        });
        resolve("new doc successfully inserted");
      } catch (err) {
        console.log(err);
      }
    });
  },
  getDocs: (...args) => {
    const [collectionName] = args;
    let docs = [];
    const ref = collection(db, collectionName);
    const Query = query(ref, orderBy("date", "desc"));
    return new Promise(async (resolve) => {
      try {
        const snapshots = await getDocs(Query);
        snapshots.forEach((doc) => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
        });
        resolve(docs);
      } catch {}
    });
  },
};
export default Firestore;
