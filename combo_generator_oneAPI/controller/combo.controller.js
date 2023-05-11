const opt = require("../models").option;

const combo = require("../models").combo;

const addData = async (req, res) => {
//   console.log(req.body);
  let cname = req.body.cname;
  let ctype = req.body.selection;
    
    let length = Object.keys(req.body).length;
    for(let i=3;i<=length;i++) {
        let option="optname_"+(i-2)
        let optionValues=eval("req.body."+option)
        let s=""
        let arrayOfOption=[]
        for(let j=0;j<optionValues.length;j++){
           
            s={optionName:`${optionValues[j]}`}
            arrayOfOption.push(s)
        }

        // console.log(cname[i-3],ctype[i-3],arrayOfOption);
        if(typeof(cname == "string")){
          const data = await combo.create({
            comboName: cname,
            comboType: ctype,
            options:arrayOfOption
          },{
            include:[
              {
                model:opt
              }
            ]
          });
        }
        else{
          const data = await combo.create({
            comboName: cname[i-3],
            comboType: ctype[i-3],
            options:arrayOfOption
          },{
            include:[
              {
                model:opt
              }
            ]
          });
        }
      res.redirect('showData');
    }
}

const showData = async(req,res) =>{
  try{
    let data = await combo.findAll({
      include:[{
        model:opt
      }]
    })
    // console.log(data);
    res.render('showData',{data:data})
  }
  catch(err){
    res.status(404).send(err.message)
  }
}

const updateData = async(req,res)=>{
  try{
    let id = req.params.id;
    const data = await opt.update(req.body,{
      where:{
        id:id
      }
    })
    res.send(data)

  }
  catch(err){
    req.status(404).send(err.message);
  }
}

module.exports = { addData,updateData,showData };
