import { Request } from "express";

export const insertEvent = async (body: any) => {
  //construct the data
  console.log(`insertEvent :${body}, type ${typeof body}`);

  //save in redis

  //save in mongo db
};
