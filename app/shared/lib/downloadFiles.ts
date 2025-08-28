import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

import { Platform } from 'react-native';

export const downloadFiles = async (
  url: string,
  name: string,
  cbProgress: (downloadProgress: FileSystem.DownloadProgressData) => void
) => {
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + name,
    {},
    cbProgress
  );
  const result = await downloadResumable.downloadAsync();

  if (result) {
    saveFile(result.uri);
  }
};

export const readFiles = async () => {
  if (FileSystem.documentDirectory) {
    await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
  }
};

const saveFile = async (uri: string) => {
  shareAsync(uri);
  readFiles();
};

// const saveFile = async (uri: string, filename: string, mimetype: string) => {
//   if (Platform.OS === "android") {
//     const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
//     if (permissions.granted) {
//       const base64 = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       await FileSystem.StorageAccessFramework.createFileAsync(
//         permissions.directoryUri,
//         filename,
//         mimetype,
//       )
//         .then(async uri => {
//           await FileSystem.writeAsStringAsync(uri, base64, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           readFiles();
//         })
//         .catch(e => console.log(String(e)));
//     } else {
//       shareAsync(uri);
//       readFiles();
//     }
//   } else {
//     shareAsync(uri);
//     readFiles();
//   }
// };
