import { makeObservable, observable } from "mobx";
export interface PostsI {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default class PostsStore {
  @observable
  posts: PostsI[] = [];
  constructor() {
    makeObservable(this);
  }
}
