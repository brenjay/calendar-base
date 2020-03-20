import { Model } from "@vuex-orm/core";

export default class Search extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = "search";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.uid(),
      departing: this.string(""),
      arriving: this.string(""),
      depart: this.number(0),
      arrive: this.number(0),
      oneway: this.boolean(false)
    };
  }
}
