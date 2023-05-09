
const option = require('../repository/option.repository');

const addData = async(req,res)=> {
    
    const body = req.body;
    try{
        const data = await option.addDataQuery(body);
        res.send(data);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}
const updateData = async(req,res)=>{
    var id = req.params.id;
    var body = req.body
    try{
        const data = await option.updateDataQuery(body,id)
        res.send(data);
    }
    catch(err){
        console.log(err.message);
    }
}
const deleteData = async(req,res)=>{
    var id =req.params.id;
    try{
        const data = await option.deleteDataQuery(id)
        res.json(data)
    }
    catch(error) {
        res.status(404).send(error.message);
    }
}
module.exports = {addData,updateData,deleteData}