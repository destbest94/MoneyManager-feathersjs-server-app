class Calculate {
  
  constructor() {
    this.items = [];
    this.currentId = 0;
  }

  async create(data, params) {
    const item = Object.assign({
      id: ++this.currentId,
    }, data);
    
    this.items.push(item);

    return item;
  }

  async find(params) {
    return Promise.resolve(this.items);
  }

  async get(id, params) {
    const item = this.items.find(item => item.id === parseInt(id, 10));

    if(!item) {
      return {
        error: true,
        message: `item not found! id = ${ id }`
      }
    }

    return item;
  }

  async patch(id, data, params) {
    const item = await this.get(id);

    return Object.assign(item, data);
  }

  async remove(id, params) {
    const item = await this.get(id);
    const index = this.items.indexOf(item);

    this.items.splice(index, 1);

    return item;
  }
}

module.exports = new Calculate();
