import { type Request, type Response } from "express";

export interface Controller {
  handle: (req: Request, res: Response) => Promise<Response | void>;
}
