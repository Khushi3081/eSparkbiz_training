const combo = require('../models').combo_master;
const option_master = require('../models').option_master;

const addDataQuery = async(body)=>{
    try{
        return combo.create({
            comboName:body.comboName,
            comboType :body.comboType,
            option_masters:body.option_masters
        }
        ,{
            include:[{
                model:option_master
            }]
        }
        )
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {addDataQuery}