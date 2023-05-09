const combo = require('../repository/combo.repository');
const combo2 = require('../models').combo_master;
const option_master = require('../models').option_master;

const addData = async(req,res)=> {
    
    const body = req.body;
    try{
        const data = await combo.addDataQuery(body);
        res.send(data);
    }
    catch(err){
        res.status(404).send(err.message);
    }
}
const showData = async(req,res)=>{
    try{
        const data =  await combo2.findAll({})
        const length = data.length;
        var info = "";
        for(let i=0;i<length;i++) {
            
           options = await option_master.findAll({
                where:{
                    comboId:i+1    
                }
            }) 
            const comboType = data[i].comboType;
            const comboName = data[i].comboName;
            console.log(comboName);
           if(comboType == 'dropdown') {
            info += `<li><select name="${comboName}", id="${comboName}">
                    <option value="">Select your ${comboName}</option>`
                    for(let j=0;j<options.length;j++){
            info += `<option value="">${options[j].optionName}</option>`
                    }
            info+=  `</select>
            </li><br>`
            
           }
           if(comboType == 'Radio button'){
            info += `<li>`
                    for(let j=0;j<options.length;j++){
            info += `<input type="radio" name="${comboName}",value="${options[j].optionName}">${options[j].optionName}</input>`
                    }
            info += `</li><br>`
           }
           if(comboType == 'Checkbox'){
            info += `<li>`
                    for(let j=0;j<options.length;j++){
            info += `<input type="checkbox" name="${options[j].optionName}",value="${options[j].optionName}">${options[j].optionName}</input>`
                    }
            info += `</li><br>`
           }
          if(comboType == 'multi-select dropdown') {
            info += `<li><select name="${comboName}", id="${comboName}" multiple>
                    <option value="">Select your ${comboName}</option>`
                    for(let j=0;j<options.length;j++){
            info += `<option value="">${options[j].optionName}</option>`
                    }
            info+=  `</select>
            </li><br>`
            
           }
        }
        res.send(info);
        
    }
    catch(err){
        res.status(404).send(err.message);
    }
}
const updateData = async(req,res)=>{
    var id = req.params.id;
    try{
        const data = await combo2.update(req.body,{
            where:{
                id:id
            }
        })
        res.send(data);
    }
    catch(err){
        console.log(err.message);
    }
}
const deleteData = async(req,res)=>{
    var id =req.params.id;
    try{
        const data = await combo2.destroy({
            where:{
                id:id
            }
        })
        // const retrive = await combo2.restore();
    res.json(data)
    }
    catch(error) {
        res.status(404).send(error.message);
    }
}
module.exports = {addData,showData,updateData,deleteData}