/**
 * @description This file contains utility function related to transformation
 * 
 */

/**
 * @param entry The object to be transformed
 * @param keyName Name of the property that will be extracted as the access key
 * @returns Transformed object
 * @description This function will change [{ name: 'Bob', age: 3 }, { name: 'Alice', age: 4 }] to { Bob: { age: 3 }, Alice: { age: 4 } }
 */
const extractKeyProperty = function extractKey(entry: { [key: string]: any; }[], keyName: string = 'Name'): { [key: string]: any; } {
  const toReturn: { [key: string]: any; } = {};

  for (const elm of entry) {
    toReturn[elm[keyName]] = JSON.parse(JSON.stringify(elm));
    delete toReturn[elm[keyName]][keyName]; // Deletes key name from the new property
  }

  return toReturn;
};

export {
  extractKeyProperty
};