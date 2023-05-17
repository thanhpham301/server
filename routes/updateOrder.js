const mongoClient = require('mongodb').MongoClient
const mongoURL = process.env.MONGO_URL 
const client = await mongoClient.connect(mongoURL)
const db = client.db('database_name')
const ordersCollection = db.collection('orders')

app.patch('/api/orders/:id', async (req, res) => {
  const orderId = req.params.id
  const update = { $set: { completed: true }}
  
  // Update the document in MongoDB
  const result = await ordersCollection.updateOne({ _id: orderId }, update)  
  
  res.json({ success: true })
}) 