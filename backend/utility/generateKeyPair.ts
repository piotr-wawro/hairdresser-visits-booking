import crypto from "crypto";
import fs from "fs";

const keyPair = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

if (!fs.existsSync("./key")) {
  fs.mkdirSync("./key");
}

fs.writeFileSync(process.env.PUB_KEY || "", keyPair.publicKey);
fs.writeFileSync(process.env.PRIV_KEY || "", keyPair.privateKey);
