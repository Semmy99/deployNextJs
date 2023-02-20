import MainPage from "components/MainPage";
import { InputNames } from "components/MainPage/PlacesAutocomplete/types";
import { GetServerSideProps } from "next";
import { ParamsQuery, WikiDataLangsResponseType } from "types/directionTypes";
import { getCityInfoByWiki } from "components/wikiHelpers";
// TODO:
// 1 - нужно разобраться с интернационализацией
// пример в трелло добавил. в Википедии надо обработать ошибки
// нужно либо переводить слова на язык по локали и ориентироваться на нее, либо обработать ошибку

const DirectionPage = () => {
  return (
    <>
      <MainPage />
    </>
  );
};

export default DirectionPage;

export const getServerSideProps: GetServerSideProps<{
  ssrData: ParamsQuery;
}> = async (context) => {
  const { r1, r2 } = context.query;
  try {
    let descrCityFrom;
    let descrCityTo;
    if (r1) {
      descrCityFrom = await getCityInfoByWiki(r1 as string, context.locale);
    }
    if (r2) {
      descrCityTo = await getCityInfoByWiki(r2 as string, context.locale);
    }

    return {
      props: {
        ssrData: {
          r1: (context.query as unknown as ParamsQuery).r1 || null,
          r2: (context.query as unknown as ParamsQuery).r2 || null,
        },

        initialState: {
          [InputNames.FROM]: descrCityFrom,
          [InputNames.TO]: descrCityTo,
          queryParams: { r1, r2 },
        },
      },
    };
  } catch (error) {
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
};

// TODO: пример установки значений в стор
// export async function getServerSideProps(context: GetServerSideProps) {
//   const body = await (
//     await fetch("https://jsonplaceholder.typicode.com/todos/1")
//   ).json();
//   return {
//     props: { initialState: { data: body }, body }, // will be passed to the page component as props
//   };
// }

// async function detectWikiDataLang(city: string, locale: string | undefined) {
//   try {
//     // если слово длинное с запятыми, забираем первую часть
//     const cityFirstPart = city?.split(",")?.[0];

//     const [detectedLand] = lngDetector.detect(cityFirstPart);

//     // Если яз юзера не равен языку введенного слова
//     // нужно найти это слово на языке юзера
//     if (detectedLand?.[0] && locale !== detectedLand?.[0]) {
//       // console.log("ZZZZZZZZZZZZZ", detectedLand);

//       // Находим весь список этих слов на разных языках
//       const response = await fetch(
//         `https://${detectedLand[0]}.wikipedia.org/w/api.php?action=query&prop=langlinks&titles=${city}&format=json&lllimit=500`,
//       );
//       const data: WikiDataLangsResponseType = await response.json();
//       const [pageId] = Object.keys(data?.query?.pages || {});
//       const allLangsData = data?.query?.pages?.[pageId].langlinks;
//       // console.log("allLangsData", allLangsData);

//       const currentLang = allLangsData?.find((l) => l.lang === locale);
//       // console.log("detectedLand[0]", lngDetector.detect("Moscow"));

//       // "سامارا (روسيا)"
//       if (currentLang) {
//         return await getWikiData(currentLang["*"], locale);
//       }
//       return { query: { pages: {} } };
//     }
//     // если равны то отдаем сразу ответ
//     if (detectedLand[0] && locale === detectedLand[0]) {
//       return await getWikiData(cityFirstPart, locale);
//     }
//     return defDataResp;
//   } catch (error) {
//     console.log("detectWikiDataLang ERROR", error);
//     return defDataResp;
//     // return { r1: "", r2: "" };
//   }
// }
