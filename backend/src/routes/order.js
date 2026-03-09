import express from 'express'
import OrderController from '../controllers/orderController.js'

const orderRouter = express.Router()

const orderController = new OrderController()

orderRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await orderController.getOrders()

    res.status(statusCode).send({ success, statusCode, body })
})

orderRouter.post('/', async (req, res) => {
    const result = await orderController.addOrder(req.body)
    res.status(result.statusCode).send(result)
})

orderRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await orderController.deleteOrder(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

orderRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await orderController.updateOrder(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})


export default orderRouter