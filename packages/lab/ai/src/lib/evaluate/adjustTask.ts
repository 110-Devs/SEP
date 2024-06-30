/**
 * Prepares the doTask() method from the AI so that it is ready to be executed by eval()
 *
 * @param {[key: string]: string} selectorArr Associative array that has every selector to each class
 * @param {string} doTask Outputted doTask method as a string
 * @returns
 */
export function adjustTask(
  selectorArr: { [key: string]: string },
  doTask: string
) {
  const codeIdentifier = /.*```javascript\s*([\s\S]*?)\s*```.*/; // Get only the code string
  const classIdentifier = /\.?[A-Z][0-9]{2}/g; // Get only the replaced class
  const match = doTask.match(codeIdentifier);

  if (match) {
    const functionString = match[1];

    //returns the selector from the array
    const replacedTask: string = functionString.replace(classIdentifier, (match: string): string => {
        const key: string = match.slice(1);
        if (key in selectorArr) {
          return selectorArr[key];
        }
        return match;
      }
    );
    return replacedTask;
  } else {
    return 'No match found';
  }
}
