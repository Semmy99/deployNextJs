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
  hydrate() {
    console.log("");
  }
}

// export default class RootStore {
//   // [NOTIFICATIONS_STORE]: NotificationsStore;

//   constructor() {
//     // this[NOTIFICATIONS_STORE] = new NotificationsStore(this);
//   }
// }

// export const store = new RootStore();

// export const StoreContext = createContext(store);

// export const useNotificationsStore = () => useStore().notificationsStore;
