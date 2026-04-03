export interface Document {
  id: string | number;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  status: 'published' | 'draft' | 'archived';
  thumbnail?: string;
  description?: string;
  repoName?: string;
  repoFullName?: string;
  githubUrl?: string;
  pageCount?: number;
  content?: string;
  pages?: {
    id: string;
    name: string;
    content: string;
  }[];
}
