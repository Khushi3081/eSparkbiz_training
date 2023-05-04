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
        const ids = req.params.id;
        const findData = await teaminfo.findByPk(ids,{
            include:playerinfo
        })
        console.log(findData);
        // console.log(findData.playerinfos);
        const updateData = findData.playerinfos.find(playerinfo => ids == playerinfo.teaminfoId);

        console.log("playerinfo",playerinfo.id);
        console.log(playerinfo.teaminfoId);
        findData.teamName =req.body.teamName;
        findData.noOfPlayer =req.body.noOfPlayer;
        findData.teamType =req.body.teamType;
        
        updateData.playerName =req.body.playerinfos.playerName;
        updateData.playerEmail =req.body.playerinfos.playerEmail;
        updateData.playerGame =req.body.playerinfos.playerGame;
        const data = await findData.save();
        const data2 = await updateData.save();

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
    