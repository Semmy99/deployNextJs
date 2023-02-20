// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChatGPTAPI } from "chatgpt";
import { langsData } from "data/consts";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  info: string;
};

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI || "",
});

export async function getInfoWithChatGpt(
  api: ChatGPTAPI,
  place: string,
  lang: string,
) {
  const resAbout = await api.sendMessage(
    `tell me about ${place} place and translate to ${lang} language`,
  );
  return resAbout.text;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const place = typeof req.query.place === "string" ? req.query.place : "";
    const locale = typeof req.query.l === "string" ? req.query.l : "en";
    const currentLang = langsData.find((l) => l.langCode === locale);
    const txt = await getInfoWithChatGpt(
      api,
      place as string,
      currentLang?.lang || "English",
    );

    res.status(200).json({ info: txt });
  } catch (error) {
    console.log("handler api error", error);

    res.status(400).json({ info: "" });
  }
}
