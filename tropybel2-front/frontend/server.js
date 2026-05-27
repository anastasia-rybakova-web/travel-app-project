import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

http.createServer((req, res) => {
  let filePath = req.url === "/" ? "index.html" : req.url.substring(1);
  filePath = path.join(__dirname, "dist", filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      const indexPath = path.join(__dirname, "dist", "index.html");
      fs.readFile(indexPath, (indexErr, indexData) => {
        if (indexErr) {
          res.statusCode = 404;
          res.end("Not Found");
          return;
        }

        res.setHeader("Content-Type", "text/html");
        res.end(indexData);
      });
      return;
    }

    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    } else if (filePath.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    } else if (filePath.endsWith(".html")) {
      res.setHeader("Content-Type", "text/html");
    }

    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
