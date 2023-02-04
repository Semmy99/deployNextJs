import MainPage from "components/MainPage";
import { InputNames } from "components/PlacesAutocomplete/types";
import { GetServerSideProps } from "next";
import { ParamsQuery, WikiDataLangsResponseType } from "./types";
const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect("iso2");
const defDataResp = { query: { pages: {} } };
// TODO:
// 1 - нужно разобраться с интернационализацией
// пример в трелло добавил. в Википедии надо обработать ошибки
// нужно либо переводить слова на язык по локали и ориентироваться на нее, либо обработать ошибку
// 2 - Вывод изображений от гугла
const DirectionPage = ({ ssrData }: { ssrData: ParamsQuery }) => {
  // console.log("ssrData", ssrData);

  return (
    <>
      <div
        className="text-container"
        // dangerouslySetInnerHTML={{
        //   __html: ssrData?.wikiData?.[InputNames.FROM].infoCity,
        // }}
      >
        {ssrData?.wikiData?.[InputNames.FROM]?.infoCity}
      </div>
      <div className="text-container">
        {ssrData?.wikiData?.[InputNames.TO]?.infoCity}
      </div>
      <MainPage r1={ssrData.r1 as string} r2={ssrData.r2 as string} />
    </>
  );
};

export default DirectionPage;

export const getServerSideProps: GetServerSideProps<{
  ssrData: ParamsQuery;
}> = async (context) => {
  console.log("--------------------------------");

  const { r1, r2 } = context.query;
  try {
    let descrCityFrom;
    let descrCityTo;
    let infoCityFrom;
    let infoCityTo;
    if (r1) {
      descrCityFrom = await detectWikiDataLang(r1 as string, context.locale);
      const [pageIdFrom] = Object.keys(descrCityFrom?.query?.pages || {});
      infoCityFrom =
        (pageIdFrom && descrCityFrom.query.pages[pageIdFrom].extract) || null;
    }
    if (r2) {
      descrCityTo = await detectWikiDataLang(r2 as string, context.locale);
      const [pageIdTo] = Object.keys(descrCityTo?.query?.pages || {});
      infoCityTo =
        (pageIdTo && descrCityTo.query.pages[pageIdTo].extract) || null;
    }
    // const descrCityFrom = await detectWikiDataLang(
    //   r1 as string,
    //   context.locale,
    // );
    // const descrCityTo = await detectWikiDataLang(r2 as string, context.locale);

    // const [pageIdFrom] = Object.keys(descrCityFrom?.query?.pages || {});
    // const [pageIdTo] = Object.keys(descrCityTo?.query?.pages || {});

    // const infoCityFrom =
    //   (pageIdFrom && descrCityFrom.query.pages[pageIdFrom].extract) || null;
    // const infoCityTo =
    //   (pageIdTo && descrCityTo.query.pages[pageIdTo].extract) || null;

    return {
      props: {
        ssrData: {
          r1: (context.query as unknown as ParamsQuery).r1 || null,
          r2: (context.query as unknown as ParamsQuery).r2 || null,
          wikiData: {
            [InputNames.FROM]: {
              ...(descrCityFrom || {}),
              infoCity: infoCityFrom || "",
            },
            [InputNames.TO]: {
              ...(descrCityTo || {}),
              infoCity: infoCityTo || "",
            },
          },
        },
        initialState: { data: { s: "ZHOOOOPAAAA" } },
      },
    };
  } catch (error) {
    console.log("ERRR getServerSideProps", error);
    return {
      props: {
        ssrData: {
          r1: "",
          r2: "",
          wikiData: {},
        },
      },
    };
  }

  // const response = await fetch(
  //   "https://ru.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=Новокуйбышевск&format=json&indexpageids",
  //   // "https://ru.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=Новокуйбышевск&format=json",
  // );
  // // https://en.wikipedia.org/?curid=16093
  // const wikiData = await response.json();
  // console.log("AAAAAAAAA", wikiData);

  // const pageId = Object.keys(wikiData.query.pages)[0];
  // const extract = wikiData.query.pages[pageId].extract;
  // console.log("--pageId---", pageId);
  // console.log("--extract---", extract);
};

// Получаем все варианты на разных языках поискового слова
// чтобы дальше сделать правильный запрос на правильный эндпоинт
// Например пользователь пиiет samara, но локаль у него ru нужно показывать ру текст
async function detectWikiDataLang(city: string, locale: string | undefined) {
  try {
    // если слово длинное с запятыми, забираем первую часть
    const cityFirstPart = city?.split(",")?.[0];
    console.log("cityFirstPart", cityFirstPart);

    // console.log("lngDetector", lngDetector.setLanguageType ("ru"));
    const [detectedLand] = lngDetector.detect(cityFirstPart);

    // Если яз юзера не равен языку введенного слова
    // нужно найти это слово на языке юзера
    if (detectedLand?.[0] && locale !== detectedLand?.[0]) {
      // Находим весь список этих слов на разных языках
      const response = await fetch(
        `https://${detectedLand[0]}.wikipedia.org/w/api.php?action=query&prop=langlinks&titles=${city}&format=json&lllimit=500`,
      );
      const data: WikiDataLangsResponseType = await response.json();
      const [pageId] = Object.keys(data?.query?.pages || {});
      const allLangsData = data?.query?.pages?.[pageId].langlinks;
      // console.log("allLangsData", allLangsData);

      const currentLang = allLangsData?.find((l) => l.lang === locale);
      // console.log("detectedLand[0]", lngDetector.detect("Moscow"));

      if (currentLang) {
        return await getWikiData(currentLang["*"], locale);
      }
      return { query: { pages: {} } };
    }
    // если равны то отдаем сразу ответ
    if (detectedLand[0] && locale === detectedLand[0]) {
      return await getWikiData(city, locale);
    }
    return defDataResp;
  } catch (error) {
    console.log("detectWikiDataLang ERROR", error);
    return defDataResp;
    // return { r1: "", r2: "" };
  }
}
async function getWikiData(city: string, locale = "en") {
  try {
    const response = await fetch(
      `https://${locale}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${city}&format=json&indexpageids`,
      // `https://${locale}.wikipedia.org/w/api.php?action=query&prop=langlinks&exintro&explaintext&titles=${city}&format=json&indexpageids`,
    );
    const wikiData = await response.json();
    console.log("wikiData", wikiData);

    // const pageId = Object.keys(wikiData.query.pages)[0];
    // const extract = wikiData.query.pages[pageId].extract;
    // console.log("--pageId---", pageId);
    // console.log("--extract---", extract);
    // return extract;
    return wikiData;
  } catch (error) {
    console.log("getWikiData ERROR");
    return { r1: "", r2: "" };
  }
}

// TODO: пример установки значений в стор
// export async function getServerSideProps(context: GetServerSideProps) {
//   const body = await (
//     await fetch("https://jsonplaceholder.typicode.com/todos/1")
//   ).json();
//   return {
//     props: { initialState: { data: body }, body }, // will be passed to the page component as props
//   };
// }
