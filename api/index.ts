import { setupApp } from "../server/index";

export default async (req: any, res: any) => {
  const app = await setupApp();
  return app(req, res);
};
