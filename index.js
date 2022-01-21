
const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
    const AllSlider = database.collection("AllSider");
    const WorkingSection = database.collection("WorkingSection");

// ============ Create-blog-post for Blog Page=============== //

    // Add Blog Post By POST API
    app.post('/all-blog-post', async(req,res)=>{
      const BlogPost=req.body;
      const BlogPostResult = await AllBlogPost.insertOne(BlogPost);
      res.json(BlogPostResult)
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
        const AllBlogPostresult = await AllBlogPost.deleteOne(query);
        res.json(AllBlogPostresult);
    })

    //  ================= Slider =======================//

    // Add Slider By POST API ......
    app.post('/slider', async(req,res)=>{
      const SliderPost = req.body;
      const AllSliderResult =await AllSlider.insertOne(SliderPost);
      res.json(AllSliderResult);


    })

    // Get Silder post by GET API ...
    app.get('/slider', async(req,res)=>{
      const cursor = AllSlider.find({});
      const cursorSlider = await cursor.toArray()
      res.send(cursorSlider);


    })

      // Delete Blog Post ....

      app.delete('/slider/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const AllSliderResult = await AllSlider.deleteOne(query);
        res.json(AllSliderResult);
    })
    

      //  ================= Working Section =======================//

       // Add Working Section By POST API ......
    app.post('/work', async(req,res)=>{
      const WorkingPost = req.body;
      const AllworkingPostResult =await WorkingSection.insertOne(WorkingPost);
      res.json(AllworkingPostResult);


    })

    // Get Silder post by GET API ...
    app.get('/work', async(req,res)=>{
      const cursor = WorkingSection.find({});
      const cursorWorkingPost = await cursor.toArray()
      res.send(cursorWorkingPost);


    })

      // Delete Blog Post ....

      app.delete('/work/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const AllWorkingResult = await WorkingSection.deleteOne(query);
        res.json(AllWorkingResult);
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