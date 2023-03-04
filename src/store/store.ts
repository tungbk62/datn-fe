import { RematchDispatch, RematchRootState, init } from "@rematch/core";
import createPersistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import { RootModel, models } from "./models";

const persistPlugin: any = createPersistPlugin({
  key: "root",
  storage,
  version: 2,
  whitelist: ["authModel", "appModel"],
});

export const store = init({
  models,
  plugins: [persistPlugin],
});
export const { getState, dispatch } = store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
