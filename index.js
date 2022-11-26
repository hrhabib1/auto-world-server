const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nwzqkqi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
     try{
          const carsCollection = client.db('autoWorld').collection('cars');
          app.get('/carsOptions', async(req, res)=>{
            const search =  req.query.search;
            let query = {};
            if(search.length){
                query = {
                    $text :{
                        $search: search
                    }
                }
            }

            const options = await carsCollection.find(query).toArray();
            res.send(options);
          })
     }
     finally{

     }
}
run().catch(console.log)


app.get('/', async(req, res) => {
  
    res.send('auto world server is running.....')
})
app.listen(port, ()=> console.log(`Auto world server is running on port ${port}`))