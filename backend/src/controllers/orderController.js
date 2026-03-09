import OrderDAO from "../dao/orderDAO.js";
import { ok, serverError } from '../helpers/httpResponse.js'
import { ObjectId } from 'mongodb'

export default class OrderController {

    constructor() {
        this.dao = new OrderDAO()
    }

    async getOrders(){
        try {
            const orders = await this.dao.getOrders()
            return ok(orders)

        } catch (error) {
            return serverError(error)
        }
    }

    async addOrder(orderData) {
        try {

            const order = {
                numeroPedido: orderData.numeroPedido,
                valorTotal: orderData.valorTotal,
                dataCriacao: orderData.dataCriacao,

                items: (orderData.items || []).map(item => ({ //EVITA ERRO SE ITEMS NÃO VIER
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }

            const result = await this.dao.addOrder(order)

            return ok(result)

        } catch (error) {
            console.error('❌ ERRO AO CRIAR PEDIDO:', error)
            return serverError(error)
        }
    }

    async deleteOrder(orderId){
        try {
            const result = await this.dao.deleteOrder(orderId)
            return ok(result)

        } catch (error) {
            return serverError(error)
        }
    }

    async updateOrder(orderId, orderData){
        try {
            const result = await this.dao.updateOrder(orderId, orderData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }
}