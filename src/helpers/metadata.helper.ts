export interface IMedatada {
    [key: string]: any;
  }

export function convertToMetadata(data: any[]): IMedatada {
    const result: IMedatada = {};
    for (const item of data) {
      const keys = item.key.split('.');
      let levelObj = result;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!levelObj[key]) {
          levelObj[key] = {};
        }
        levelObj = levelObj[key];
      }
      levelObj[keys[keys.length - 1]] = item.value;
    }
    return result;
  }
  
  export function removeObjectsFromMetadata(obj: IMedatada, keysParaRemover: string[]): IMedatada {
    const result: IMedatada = { ...obj };
    keysParaRemover.forEach(caminho => {
      const keys = caminho.split('.');
      let tempObj = result;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (tempObj && tempObj[key] !== undefined) {
          tempObj = tempObj[key];
        } else {
          tempObj = undefined;
          break;
        }
      }
      if (tempObj && tempObj.hasOwnProperty(keys[keys.length - 1])) {
        delete tempObj[keys[keys.length - 1]];
      }
    });
    return result;
  }