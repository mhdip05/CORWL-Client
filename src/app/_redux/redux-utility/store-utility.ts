interface Entity {
  id: any;
}

export class StoreUtility {
  static normalize(entityArray: Entity[], hasOtherkeyPropertyName: boolean = false) {
    return entityArray.reduce((accumulator, currentValue) => { 
      if (hasOtherkeyPropertyName)       
        return { ...accumulator, ...{ [Object.values(currentValue)[0]]: currentValue } };
      else 
        return { ...accumulator, ...{ [currentValue.id]: currentValue } };
    }, {});
  }

  static unNormalize(entities: { [id: number]: any }) {
    if (!entities) return [];
    return Object.keys(entities).map((key: any) => entities[key]);
  }

  static filterDuplicate(ids: number[]) {
    return ids.filter((value, index, array) => {
      return index === array.indexOf(value);
    });
  }

  static removeKey(entities: { [id: number]: any }, id: any) {
    const newObj = { ...entities };
    delete newObj[id];
    return newObj;
  }

  // static removeAll(entities: { [id: number]: any }){
  //     var data = entities.
  // }
}
