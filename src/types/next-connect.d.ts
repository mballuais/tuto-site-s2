declare module "next-connect" {
  import type { NextApiRequest, NextApiResponse } from "next";

  type Handler<Req = NextApiRequest, Res = NextApiResponse> = {
    use: (middleware: any) => Handler<Req, Res>;
    get?: (handler: (req: Req, res: Res) => any) => Handler<Req, Res>;
    post: (handler: (req: Req, res: Res) => any) => Handler<Req, Res>;
    put?: (handler: (req: Req, res: Res) => any) => Handler<Req, Res>;
    delete?: (handler: (req: Req, res: Res) => any) => Handler<Req, Res>;
  };

  function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(): Handler<Req, Res>;

  export default nextConnect;
}
