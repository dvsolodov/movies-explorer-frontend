class LocalStorage {
  setData(itemKey, data) {
    localStorage.setItem(itemKey, JSON.stringify(data));
  }

  getData(itemKey) {
    let data = JSON.parse(localStorage.getItem(itemKey));

    if (data === null) {
      data = {};
    }

    return data;
  }

  removeData(itemKey) {
    localStorage.removeItem(itemKey);
  }
}

const ls = new LocalStorage();

export { ls };
