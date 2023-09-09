export interface Chat {
  id: string;
  response: string;
  status: Status;
  parent_id: string;
  children_ids: string[];
  audio?: string | null;
  video?: string | null;
}

export enum Status {
  ACTIVATING = 'ACTIVATING',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}
