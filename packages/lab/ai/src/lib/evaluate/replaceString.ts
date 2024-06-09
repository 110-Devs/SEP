export function replaceString(
  selectorMap: Map<string, string>,
  doTask: string
) {
  const regex = /\.?[A-Z][0-9]{2}/g;
  const assArr: { [key: string]: string } = Object.fromEntries(selectorMap);
/*
  selectorMap.forEach((value, key) => {
    assArr[key] = value;
  });
*/



  const replacedTask: string = doTask.replace(
    regex,
    (match: string): string => {
      const key: string = match.slice(1);
      if (key in assArr) {
        return assArr[key];
      }
      return match;
    }
  );

  return replacedTask;
}
//#root > div > main > div.MuiGrid2-root.MuiGrid2-container.MuiGrid2-direction-xs-row.MuiGrid2-spacing-xs-3.css-1ynoxbp-MuiGrid2-root > div:nth-child(1) > div:nth-child(1) > div.MuiGrid2-root.MuiGrid2-direction-xs-row.MuiGrid2-grid-xs-12.css-1wztgj9-MuiGrid2-root > div > div.MuiCardActions-root.MuiCardActions-spacing.css-i0umbk-MuiCardActions-root > div.Wrapper_Wrapper__xLg29 > div > div > div:nth-child(2)
//#root > div > main > div.MuiGrid2-root.MuiGrid2-container.MuiGrid2-direction-xs-row.MuiGrid2-spacing-xs-3.css-1ynoxbp-MuiGrid2-root > div:nth-child(1) > div:nth-child(1) > div.MuiGrid2-root.MuiGrid2-direction-xs-row.MuiGrid2-grid-xs-12.css-1wztgj9-MuiGrid2-root > div > div.MuiCardActions-root.MuiCardActions-spacing.css-i0umbk-MuiCardActions-root > div.Wrapper_Wrapper__xLg29 > div > div > div:nth-child(2)
/*function doTask() {
    const button = document.querySelector('.A54 button');
    button.style.color = 'green';
  }*/
