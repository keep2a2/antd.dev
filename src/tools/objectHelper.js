export const simpleDeepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const dataSetTransfer = ({fields, datas}) => {
    let items = [];

    datas.forEach((data, i) => {
        let item = {};
        fields.forEach((field, index) => {
            item[field.code] = data[index];
            item.key = i;
        });
        items.push(item);
    });

    return items;
}