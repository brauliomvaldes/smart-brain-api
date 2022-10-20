//const Clarifai = require('clarifai');
//listar todos los modelos disponibles
//console.log(Clarifai)
//You must add your own API key here from Clarifai.
//const app = new Clarifai.App({
//    apiKey: '50a9296f9a264cdea019ba77f569182d'
//});

const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 50a9296f9a264cdea019ba77f569182d");

const handleApiCall = (req, res)=>{
    //console.log('req.body.input:',req.body.input);
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
    
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
    
            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ": " + c.value);
            }
            res.json(response);
        }
    );
}


//const handleApiCall = (req, res)=>{
//    app.models
//        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
//        .then(data=>{
//            res.json(data);
//        })
//        .catch(err=>res.status(400).json('No es posible accesar a la API'))
//}


const handleImagen = (req, res, db)=>{
    // los datos viene por body
    const { id } = req.body;
    
    db('users').where('id','=',id)
    .increment( 'entries', 1)
    .returning('entries')
    .then(entries=>{
        //console.log('entredas backend devueltas:', entries[0], 'tipo:', typeof(entries[0]))
        res.json(entries[0])
    })
    .catch(err=>res.status(400).json('Error al obtener entrada'))
}

module.exports = {
    handleImagen,
    handleApiCall
}