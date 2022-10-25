import { action } from "mobx";
import PostsStore from "./PostsStore";
import SomeStore from "./SomeStore";

export default class RootStore {
  "SomeStore": SomeStore;
  "PostsStore": PostsStore;

  constructor() {
    this.SomeStore = new SomeStore();
    this.PostsStore = new PostsStore();
  }
  @action.bound
  hydrate() {
    console.log("hidratehidratehidratehidratehidrate");
  }
}

// console.log("RootStore", RootStore);

// export default class RootStore {
//   // [NOTIFICATIONS_STORE]: NotificationsStore;

//   constructor() {
//     // this[NOTIFICATIONS_STORE] = new NotificationsStore(this);
//   }
// }

// export const store = new RootStore();

// export const StoreContext = createContext(store);

// export const useNotificationsStore = () => useStore().notificationsStore;
