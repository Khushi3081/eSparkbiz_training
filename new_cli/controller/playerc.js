const player = require('../models').playerinfo;

const addData = async (req,res) =>{
    try{
        const player = await player.create({
        playerName:req.body.playerName,
        playerEmail:req.body.playerEmail,
        playerGame:req.body.playerGame,
        teaminfoId:req.body.teaminfoId
        })
        res.send(player);
    }
        catch(error){
            console.log(error.message);
        }
}


const getAllData = async(req,res) => {
    try{
    const players = await player.findAll({
        include:[{
            model:team
        }]
    });
    res.send(players);
    }
    catch(error){
        console.log(error.message);
    }

}

const getOneData = async(req,res) => {
    try{
    const id = req.query.id;
    const playerOne = await player.findAll({
        where:{
            id:id
        }
    })
    res.send(playerOne);
    }
    catch(error){
        console.log(error.message);
    }
}

const updateData = async (req,res) =>{
    try{
    const id = req.params.id;
    const data = await player.update(req.body,{
        where:{
            id:id
        }
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
    const data = await player.destroy({
        where: {
            id:id
        }
    })
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