const teaminfo = require('../models').teaminfo;
const playerinfo = require('../models').playerinfo;

const addData = async(req,res)=> {
    try{
    const data = await teaminfo.create({
        teamName:req.body.teamName,
        noOfPlayer:req.body.noOfPlayer,
        teamType:req.body.teamType,
        playerinfos:req.body.playerinfos
        },{
            include:[{
                model:playerinfo
            }]
        }
    );
     res.send(data);
    }
    catch(error){
        console.log(error.message);
    }
}
    const getAllData = async(req,res) => {
     try{
        const teams = await teaminfo.findAll({
            include:[{
                model:playerinfo
            }]
        });
        res.send(teams);
        }
        catch(error){
            console.log(error.message);
        }
    }
    
    const getOneData = async(req,res) => {
        try{
        const id = req.query.id;
        const teamOne = await teaminfo.findAll({
            where:{
                id:id
            }
        })
        res.send(teamOne);
        }
        catch(error){
            console.log(error.message);
        }
    }
    
    const updateData = async (req,res) =>{
        try{
        const id = req.params.id;
        const data = await teaminfo.update(req.body,{
            where:{
                id:id
            }
        },{
            include:[{
                model:playerinfo
            }]
        })
        res.send(data);
        }
        catch(error){
            console.log(error.message);
        }
    }
    
    const deleteData = async (req,res) => {
        try{
        const id = req.params.id;
        const data = await teaminfo.destroy({
            where: {
                id:id
            }
        },{
                include:[{
                    model:playerinfo
                }]
            }
        )
        res.send('Data is deleted');
        }
        catch(error){
            console.log(error.message);
        }
    }
    module.exports = {
        addData,
        getAllData,
        getOneData,
        updateData,
        deleteData
    }
    