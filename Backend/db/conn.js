const mongoose = require('mongoose');

async function main() {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(
      "mongodb+srv://anaflaviassg:PTLqzBFPc1V4Xwvp@cluster0.r7gfqkt.mongodb.net/"
    );

    console.log("Conectado ao banco!")
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

module.exports = main;
