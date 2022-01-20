
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express();
const port = 5000;
require('dotenv').config()
app.use(cors());

app.use(express.json())




// MongoDB Database add...

// portfolioReact
// WEb2X42EvZfz3uns

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vuvnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
  try {
    await client.connect();
    const database = client.db("ReactPortfoloiData");
    const AllBlogPost = database.collection("AllBlogPost");

// ============ Create-blog-post for Blog Page=============== //

    // Add Blog Post By POST API
    app.post('/all-blog-post', async(req,res)=>{
      const BlogPost=req.body;
     console.log('hit the API', BlogPost);
      const result = await AllBlogPost.insertOne(BlogPost);
      res.json(result)
    });

    // Get Blog Post By GET API, 
    app.get('/all-blog-post', async(req,res)=>{
      const cursor = AllBlogPost.find({});
      const BlogData = await cursor.toArray();
      res.send(BlogData)
    })

    // Delete Blog Post ....

    app.delete('/all-blog-post/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await AllBlogPost.deleteOne(query);
        res.json(result);
    })
    
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);







// ========================================= //

// Basis Setup 
app.get('/', (req,res)=>{
  res.send('Port is running')
})


app.listen(port, ()=>{
    console.log('Port is Running Here 5000');
})