import {StorageAccessFramework} from "expo-file-system";

export async function listMediaFiles() {
  const permission = await StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (!permission.granted) {
    console.warn("Разрешение не получено");
    return;
  }

  if (permission.granted) {
    const uri = permission.directoryUri;
    console.log("uri", uri);
    const files = await StorageAccessFramework.readDirectoryAsync(uri);
    files.map(item => console.log(item));
  }
}
