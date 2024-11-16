const obj = {
  name: 'ayuhs',
  age: 30,
  company: 'survey',
  test: {
    k1: 'value',
    k2: {
      ik: 'value',
    },
  },
};

function convertTo() {
  const obj2 = {
    ...obj,
    test: {
      ...obj.test,
      k2: {
        ...obj.test.k2,
        ik: 'newValue',
      },
    },
  };
  obj2.name = 'dfas';
  console.log(obj, 'asfasfs', obj2);
}

convertTo();
