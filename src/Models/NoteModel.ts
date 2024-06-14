export default interface Note {
  id: string;
  title: string;
  content: string;
  labels: string[];
  color: string;
  pinned: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
