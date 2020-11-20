// I was trying to UP mongoose Schema but it actually doesn't work((

module.exports = {
  async up(db, client) {
    return await db.collection('userschemas2').insertOne({
      name: '',
      birthday: '',
      gender: '',
    });
  },

  async down(db, client) {
    return Promise.resolve('ok')
  }
};
