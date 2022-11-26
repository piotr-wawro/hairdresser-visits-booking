import fs from "fs";

export const logger = async (error: Error) => {
  if (!fs.existsSync("./log")) {
    fs.mkdirSync("./log");
  }

  const dir = "./log";
  const fileName = new Date().toISOString().split("T")[0];
  const text = `${new Date().toISOString()}\n${error}\n\n\n\n`;

  fs.writeFile(`${dir}/${fileName}.txt`, text, { flag: "a" }, (err) => {
    if (err) return console.log(err);
  });
};
