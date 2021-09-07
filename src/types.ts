import { User } from './graphql/generated';

export type TabProps = {
  children: React.ReactNode;
  title: string;
  count?: number;
}

export type TabTitleProps = {
  title: string;
  index: number;
  count: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

export type TabsProps = {
  children: React.ReactElement[];
}

export type Page = {
  id: number;
  name: string;
  link: string;
}

export type AlbumsProps = {
  setAlbumsCountHandler: (count: number) => void;
}

export type PostsProps = {
  setPostsCountHandler: (count: number) => void;
}

export type Question = {
  question: string;
  answer: string;
}

export type QuestionsProps = {
  data?: Question[];
  reverse?: boolean;
}

export type AlbumProps = {
  data?: any;
  unique?: number;
  setDeleteModalActive?: (isActive: boolean, itemId: number) => void;
  setGalleryModalActiveHandler?: (isActive: boolean, photos: any) => void;
  dummy?: boolean;
}

export type ModalProps = {
  active: boolean;
  setActive: (isActive: boolean, itemId: number) => void;
  children: any;
}

export type CreateFormValues = {
  title: string;
  description: string;
}

export type ProfileFormValues = User & {
  description?: any | null;
}