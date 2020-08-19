const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost:5672', ((error, conn) => {
  if (error) {
    throw error
  }
  conn.createChannel((error, channel) => {
    if (error) {
      throw error
    }
    let queue = 'Hello'
    channel.assertQueue(queue, { durable: false })
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)
    channel.consume(queue, (msg) => {
      console.log(" [x] Received %s.", msg.content.toString())
    }, { noAck: true })
  })
}))