import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../api/firebase';
import setPhotosTable from '../setTable/setPhotosTable';

// const uploadPhoto = (file, locationId) => {
//   const photo = file.target.file[0];
//   const storageRef = ref(storage, 'photos/' + 'photo/' + photo.name);
//   const upload = uploadBytesResumable(storageRef, photo);
//   console.log(`upload: ${upload}`);

//   getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
//     const url = downloadURL;
//     setPhotosTable(locationId, url);
//   });
// };
// export default uploadPhoto;
const uploadPhoto = (event, locationId) => {
  const file = event.target.files[0]; // `files` の複数形にする

  if (!file) {
    console.error('ファイルが選択されていません');
    return;
  }

  const storageRef = ref(storage, `photos/photo/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error('アップロードエラー', error);
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setPhotosTable(locationId, downloadURL);
        console.log('ダウンロードURL:', downloadURL);
      } catch (error) {
        console.error('URL取得エラー', error);
      }
    },
  );
};
export default uploadPhoto;
