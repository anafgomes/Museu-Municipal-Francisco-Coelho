const { Agendamento: AgendamentoModel } = require("../models/Agendamento");

const agendamentoController = {
  create: async (req, res) => {
    try {
      const agendamento = {
        escola: req.body.escola,
        responsavel: req.body.responsavel,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        horario: req.body.horario,
        quantidade: req.body.quantidade,
        data: req.body.data,
      };

      const response = await AgendamentoModel.create(agendamento);

      res.status(201).json({ response, msg: "Agendamento realizado com sucesso!" });

    }
    catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const agendamentos = await AgendamentoModel.find();

      res.json(agendamentos);

    } catch (error) {
      console.log(error)
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const agendamento = await AgendamentoModel.findById(id);

      if (!agendamento) {
        res.status(404).json({ msg: "Agendamento não encontrado." });
        return;
      }

      res.json(agendamento);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const agendamento = await AgendamentoModel.findById(id);

      if (!agendamento) {
        res.status(404).json({ msg: "Agendamento não encontrado." });
        return;
      }
      const deletedAgendamento = await AgendamentoModel.findByIdAndDelete(id);

      res.status(200).json({ deletedAgendamento, msg: "Agendamento excluído com sucesso." });

    } catch (error) {
      console.log(error)
    }
  },
  update: async (req, res) => {
    const id = req.params.id;

    const agendamento = {
      escola: req.body.escola,
      responsavel: req.body.responsavel,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      horario: req.body.horario,
      quantidade: req.body.quantidade,
      data: req.body.data,
    };

    const updatedAgendamento = await AgendamentoModel.findByIdAndUpdate(id, agendamento);

    if (!updatedAgendamento) {
      res.status(404).json({ msg: "Agendamento não encontrado." });
      return;
    }

    res.status(200).json({ agendamento, msg: "Agendamento atualizado com sucesso!" })
  },
};

module.exports = agendamentoController;


