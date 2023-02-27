import { init } from "@rematch/core";
import * as models from "./models";
import createPersistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
const persistPlugin: any = createPersistPlugin({
  key: "root",
  storage,
  version: 2,
  whitelist: [
    "authModel",
    // "appModel",
  ],
});

export const store = init({
  models,
  plugins: [persistPlugin],
});
export const { getState, dispatch } = store;
export type Dispatch = typeof store.dispatch;
