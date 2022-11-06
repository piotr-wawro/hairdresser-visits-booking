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

fs.writeFileSync("./key/id_rsa_pub.pem", keyPair.publicKey);
fs.writeFileSync("./key/id_rsa_priv.pem", keyPair.privateKey);
