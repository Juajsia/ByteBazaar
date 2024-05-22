import { Order } from '../models/order.model.js'
import { Product } from '../models/product.model.js'
import { OrderDetail } from '../models/orderDetails.model.js'
import { transporter } from '../utilities/mailer.js'
import { Credential } from '../models/Credential.model.js'

export class OrderController {
  getAllOrder = async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: {
          model: Product
        }
      })
      res.json(orders)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  createOrder = async (req, res) => {
    try {
      const { Products } = req.body
      const items = []
      const promise = Products.map(async (element) => {
        const item = await Product.findByPk(element.id)
        const quantity = element.CartProduct ? element.CartProduct.quantity : element.quantity
        if (item.stock < quantity) {
          items.push({ msg: 'Product: ' + item.name + ' does not have enough stock' })
        }
      })
      await Promise.all(promise)
      if (items.length > 0) {
        return res.status(400).json({ message: 'Order declined', text: items.pop() + ', This product does not have the requested quantity ', forUser: true })
      }
      let { clientId, total } = req.body
      const newOrder = await Order.create({ clientId, total })
      total = 0
      let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order</title>
    <style>
    h1 {
      color: #1A2A5A;
      font-size: 3rem;
      font-weight: bold;
      border-bottom: solid 1px #057FD7;
      padding-bottom: 10px;
      margin-bottom: 20px;
  }
  .itemsList{
    list-style: none;
  }
  hr{
    color: #1A2A5A;
  }
    p {
      color: #47525E;
      justify-self: left;
      font-size: 14px;
  }

  .productInfo {
    width: 300px;
}

.productImg {
    height: 200px;
    width: 200px;
}

.total{
  font-size: 25px;
}
    </style>
</head>

<body>
    <ul class="itemsList">
    <h1>This is your purchase summary:</h1>
    `;

      (async () => {
        for (const element of Products) {
          const quantity = element.CartProduct ? element.CartProduct.quantity : element.quantity
          await OrderDetail.create({ ProductId: element.id, OrderId: newOrder.id, quantity })
          const { stock } = await Product.findOne({ where: { id: element.id } })
          const newstock = stock - quantity
          await Product.update({ stock: newstock }, { where: { id: element.id } })
          total += element.price
          html += `<li class="cartItem">
            <img class="productImg" src="${element.image}">
            <section class="productInfo">
                <p class="productName">Product: <b>${element.name}</b></p>
                <p class="quantity">Quantity: <b>${quantity}</b></p>
                <p class="price">Price: US$<b>${element.price}</b></p>
                </section>
        </li>
        <hr>`
        }

        html += `<p class="total">Total: US$<b>${total}</b></p>
        </ul>
        </body>
        </html>`

        try {
          const cred = await Credential.findByPk(clientId)
          await transporter.sendMail({
            from: '"Bytebazaar" <juanpaadams20@gmail.com>',
            to: cred.email,
            subject: 'Thank you for shopping at Bytebazaar',
            html: `${html}`
          })
        } catch (error) {

        }
      })()

      return res.status(201).json({ newOrder, Products })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  getOrder = async (req, res) => {
    try {
      const { id } = req.params
      const order = await Order.findByPk(id, {
        include: Product
      })
      if (order) {
        res.json(order)
      } else {
        res.status(404).json({ err: 'order not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  deleteOrder = async (req, res) => {
    try {
      const { id } = await req.params
      const order = await Order.destroy({
        where: {
          id
        }
      })
      if (order) {
        res.json({ msg: 'order deleted' })
      } else {
        res.status(404).json({ err: 'order not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  getClientOrders = async (req, res) => {
    try {
      const { clientId } = await req.params
      const orders = await Order.findAll({
        where: {
          clientId
        },
        include: {
          model: Product
        }
      })
      if (orders) {
        return res.status(200).json(orders)
      }
      return res.status(200).json({ message: 'you do not have orders' })
    } catch (error) {
      return res.status(500).json({ message: error.message, forUser: false })
    }
  }

  returnOrder = async (req, res) => {
    try {
      const { id } = await req.params
      const order = await Order.findByPk(id)
      order.set(req.body)
      await order.save()
      res.status(202).json({ order, message: 'Order successfully returned ' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
