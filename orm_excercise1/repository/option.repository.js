
const option = require('../models').option_master;

const addDataQuery = async(body)=>{
    try{
         return await option.create({
            optionName:body.optionName,
            comboId:body.comboId
        });
        
    }
    catch(error){
        console.log(error.message);
    }
}
const updateDataQuery = async(body,id)=>{
    try{
        return await option.update(body,{
            where:{
                id:id
            }
        })
    }
    catch(err){
        console.log(err.message);
    }
}
const deleteDataQuery = async(id)=>{
    try{
        return await option.destroy({
            where:{
                id:id
            }
        })
    }
    catch(error) {
        console.log(error.message);
    }
}
module.exports = {addDataQuery,updateDataQuery,deleteDataQuery}