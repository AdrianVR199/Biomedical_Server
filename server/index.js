import app from "./app.js";
import { PORT } from "./config.js";
import fs, { readFileSync } from "fs";
import https from "https";
//const index = Router();
// const key = fs.readFileSync("private.key");
// const cert = fs.readFileSync("certificate.crt");

// const cred = {
//   key,
//   cert,
// };
app.listen(PORT);

// const httpsServer=https.createServer(cred,app)
// httpsServer.listen(8443)
console.log(`Server is running on port ${PORT}`);
