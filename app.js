const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost:5672', (error, conn) => {
  if(error) {
    throw error
  }
  conn.createChannel((error, channel) => {
    if(error) {
      throw error
    }
    let queue = 'hello'
    let msg = 'Hello World'

    channel.assertQueue(queue, { durable: false })
    channel.sendToQueue(queue, Buffer.from(msg))
    console.log(" [x] Sent %s", msg)
  })
  setTimeout(() => {
    conn.close()
    process.exit(0)
  }, 500)
  
})