import { langsShortCode } from "data/consts";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Select, { ActionMeta } from "react-select";
import styles from "styles/LangsSelect.module.css";
import stylesMainPage from "styles/MainPage.module.css";

const options = langsShortCode
  .sort()
  .map((code) => ({ value: code, label: code }));

function formatOptionLabelFn(data: { label: string; value: string }) {
  return (
    <div className={styles.optionsContainer}>
      <Image
        src={`/flags/${data.value}.svg`}
        width={25}
        height={25}
        alt={`image flag is ${data.value}`}
        quality="100"
      />
      <p>{data.value}</p>
    </div>
  );
}

function LangsSelect() {
  const router = useRouter();

  const [value, setValue] = React.useState(
    options.find((d) => d.value === router.locale) || null,
  );

  const onChange = (newValue: any, actionMeta: ActionMeta<any>) => {
    setValue(newValue);

    router.push(router.asPath, undefined, { locale: newValue.value });
  };
  return (
    <div className={`${stylesMainPage.container} ${styles.selectWrapper}`}>
      <Select
        options={options}
        formatOptionLabel={formatOptionLabelFn}
        value={value}
        onChange={onChange}
        className={styles.langsSelectContainer}
        placeholder=""
      />
    </div>
  );
}

export default React.memo(LangsSelect);
