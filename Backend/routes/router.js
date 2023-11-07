const router = require("express").Router()

//Agendamentos router
const agendamentosRouter = require("./agendamentos")

router.use("/", agendamentosRouter)

module.exports = router;