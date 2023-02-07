import { action } from "mobx";
import MainPageStore, { MAIN_PAGE_STORE } from "./MainPageStore";
import PostsStore from "./PostsStore";
import SomeStore from "./SomeStore";

export default class RootStore {
  "SomeStore": SomeStore;
  "PostsStore": PostsStore;
  [MAIN_PAGE_STORE]: MainPageStore;

  constructor() {
    this.SomeStore = new SomeStore();
    this.PostsStore = new PostsStore();
    this[MAIN_PAGE_STORE] = new MainPageStore();
  }
  @action.bound
  hydrate(initData: any) {
    // console.log("initData", initData);
    this[MAIN_PAGE_STORE] = new MainPageStore(initData);
  }
}
