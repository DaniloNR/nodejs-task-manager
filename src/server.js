import http from "node:http";
import { json } from "./middlewares/json.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await json(req, res);
  const route = routes[method].find((route) => route.path.test(url));

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);