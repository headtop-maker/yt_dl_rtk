import * as FileSystem from "expo-file-system";

export const clearDocumentDirectoryCache = async () => {
  if (FileSystem.documentDirectory) {
    await FileSystem.deleteAsync(FileSystem.documentDirectory, {idempotent: true});
  }
};
