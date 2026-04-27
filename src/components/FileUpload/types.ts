export type ISgdsFileUploadAddFilesEventDetail = FileList;
export type ISgdsFileUploadChangeEventDetail = FileList;
export type ISgdsFileUploadFilesSelectedEventDetail = FileList;
export interface ISgdsFileUploadRemoveFileEventDetail {
  file: File;
  files: FileList;
}
