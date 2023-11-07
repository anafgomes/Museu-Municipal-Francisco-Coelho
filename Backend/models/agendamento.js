const mongoose = require('mongoose');

const { Schema } = mongoose;

const agendamentoSchema = new Schema({
  escola: {
    type: String,
    required: true
  },
  responsavel: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  horario: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    required: true
  },
},
  { timestamps: true }
);

const Agendamento = mongoose.model("Agendamento", agendamentoSchema)

module.exports = {
  Agendamento,
  agendamentoSchema,
};