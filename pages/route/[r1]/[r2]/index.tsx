import MainPage from "components/MainPage";
import { InputNames } from "components/PlacesAutocomplete/types";
import { useStore } from "components/StoreProvider";
import { GetServerSideProps } from "next";
import { type } from "os";
import wiki from "wikijs";

type WikiDataType = {
  normalized: Array<Record<string, any>>;
  pageids: [string];
  pages: {
    string: {
      pageid: number;
      ns: number;
      title: string;
      extract: string;
    };
  };
};
interface ParamsQuery {
  r1: string;
  r2: string;
  wikiData?: {
    [InputNames.FROM]?: {
      query: WikiDataType;
      infoCity: string;
    };
    [InputNames.TO]?: {
      query: WikiDataType;
      infoCity: string;
    };
  };
}

// TODO: нужно разобраться с интернационализацией
// пример в трелло добавил
// есть проблема свикипедией при запросе данных если один город на кирилице написан а другой латинией
// вики вываливает ошибку.
// нужно либо переводить слова на язык по локали и ориентироваться на нее, либо обработать ошибку
const Routes = ({ ssrData }: { ssrData: ParamsQuery }) => {
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
      {/* <MainPage r1={ssrData.r1 as string} r2={ssrData.r2 as string} /> */}
    </>
  );
};

export default Routes;

export const getServerSideProps: GetServerSideProps<{
  ssrData: ParamsQuery;
}> = async (context) => {
  const descrCityFrom = await getWikiData(
    (context.params as unknown as ParamsQuery).r1,
  );
  const descrCityTo = await getWikiData(
    (context.params as unknown as ParamsQuery).r2,
  );
  console.log("descrCityFrom", descrCityFrom);
  console.log("desctCityTooo", descrCityTo);

  const [pageIdFrom] = Object.keys(descrCityFrom.query.pages);
  const [pageIdTo] = Object.keys(descrCityTo.query.pages);

  const infoCityFrom = descrCityFrom.query.pages[pageIdFrom].extract;
  const infoCityTo = descrCityTo.query.pages[pageIdTo].extract;
  // console.log("AAAAAAAAAAAAAA", descrCityFrom.query.pages);
  console.log("zzzzzzzzzzzz", infoCityTo);
  // console.log("--pageIdFrom---", pageIdFrom);
  // console.log("--extract---", extract);
  return {
    props: {
      ssrData: {
        r1: (context.params as unknown as ParamsQuery).r1,
        r2: (context.params as unknown as ParamsQuery).r2,
        wikiData: {
          [InputNames.FROM]: { ...descrCityFrom, infoCity: infoCityFrom },
          [InputNames.TO]: { ...descrCityTo, infoCity: infoCityTo },
          [InputNames.FROM]: { ...descrCityFrom, infoCity: infoCityFrom },
          [InputNames.TO]: { ...descrCityTo, infoCity: infoCityTo },
        },
      },
    },
  };
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

async function getWikiData(city: string) {
  try {
    const response = await fetch(
      // `https://ru.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${city}&format=json&indexpageids`,
      // `https://www.mediawiki.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${city}&format=json&indexpageids`,
      "https://commons.wikimedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=&format=json",
    );
    const wikiData = await response.json();
    // console.log("AAAAAAAAA", wikiData);

    // const pageId = Object.keys(wikiData.query.pages)[0];
    // const extract = wikiData.query.pages[pageId].extract;
    // console.log("--pageId---", pageId);
    // console.log("--extract---", extract);
    // return extract;
    return wikiData;
  } catch (error) {
    console.log("getWikiData ERROR", error);
    return null;
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
