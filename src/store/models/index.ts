import { Models } from "@rematch/core";
import { authModel } from "./auth";
import { appModel } from "./app";

export interface RootModel extends Models<RootModel> {
  authModel: typeof authModel;
  appModel: typeof appModel;
}

export const models: RootModel = { authModel, appModel };
