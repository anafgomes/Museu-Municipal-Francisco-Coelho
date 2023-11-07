const router = require("express").Router();

const agendamentoController = require("../controllers/agendamentoController");

router.route("/agendamentos").post((req, res) => agendamentoController.create(req, res));

router.route('/agendamentos').get((req, res) => agendamentoController.getAll(req, res));

router.route("/agendamentos/:id").get((req, res) => agendamentoController.get(req, res));

router.route("/agendamentos/:id").delete((req, res) => agendamentoController.delete(req, res));

router.route("/agendamentos/:id").put((req, res) => agendamentoController.update(req, res));

module.exports = router;

