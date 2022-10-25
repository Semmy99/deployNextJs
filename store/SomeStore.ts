import { action, makeObservable, observable, runInAction } from "mobx";

export default class SomeStore {
  @observable
  val: string = "";
  constructor() {
    makeObservable(this);
  }
  @action.bound
  changeVal(txt: string) {
    runInAction(() => {
      this.val = txt;
    });
  }
}
