export interface MediaValue {
  file: File | null; // The local file selected by the user
  tempUrl: string; // The local blob preview URL
  mediaId: string | null; // The uploaded media ID (cached after upload)
  initialUrl: string | null; // The initial URL from the server (if edit mode)
  isChanged: boolean; // Whether the user modified the field (selected new or removed)
  wasRemoved: boolean; // Whether the initial URL was removed or replaced
}

export interface MediaPayloadItem {
  id: string;
  key: string;
}

export interface MediaPayload {
  mediaIdsToAdd: MediaPayloadItem[] | string[];
  mediaUrlsToRemove: string[];
}
