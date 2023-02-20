import { ChatGPTAPI } from "chatgpt";

export const defDataResp = { query: { pages: {} } };

export async function detectWikiDataLang(
  city: string,
  locale: string | undefined,
) {
  try {
    // если слово длинное с запятыми, забираем первую часть
    const cityFirstPart = city?.split(",")?.[0];

    return (await getWikiData(cityFirstPart, locale)) || defDataResp;
  } catch (error) {
    console.log("detectWikiDataLang ERROR", error);
    return defDataResp;
  }
}

async function getWikiData(city: string, locale = "en") {
  try {
    const response = await fetch(
      `https://${locale}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${city}&format=json&indexpageids&origin=*`,
    );

    const wikiData = await response.json();
    return wikiData;
  } catch (error) {
    console.log("getWikiData ERROR", error);
    return { r1: "", r2: "" };
  }
}

export async function getCityInfoByWiki(cityName: string, locale?: string) {
  const descrCityFrom = await detectWikiDataLang(cityName as string, locale);
  const [pageIdFrom] = Object.keys(descrCityFrom?.query?.pages || {});
  const infoCityFrom =
    (pageIdFrom && descrCityFrom.query.pages[pageIdFrom].extract) || null;

  return {
    ...(descrCityFrom || {}),
    infoCity: infoCityFrom || "",
  };
}

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
