const user = require("../models").userData;
const eduData = require("../models").educationData;
const { Op } = require("sequelize");

const addData = async (req, res) => {
  try {
    // console.log(req.body.educationData);
    const data = await user.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        educationData: req.body.educationData,
      },
      {
        include: [
          {
            model: eduData,
          },
        ],
      }
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const data = async (req, res) => {
  res.render("index");
};

const getAllData = async (req, res) => {
  try {
    let length = req.query.length;
    let start = req.query.start;
    let txt = req.query.search || 0;
    let text = txt.value;
    let column = req.query.columns;
    let order = req.query.order;
    let orderCol = order[0].column;
    let orderDir  = order[0].dir;
    let orderby = column[orderCol].data;

    if(orderby.includes("educationData")){
      console.log("entry");
      let data = orderby.split(".");
     orderby = data[1];
     console.log("dataaaaaa",orderby);

    } 
    // console.log(text);
    var result = await user.findAll({
      start,length,
      order:[[orderby,orderDir]],
      include:[{
        model:eduData,
        where: {
        [Op.or]: [
          {
            "$userData.firstName$": {
              [Op.like]: `%${text}%`,
            },
          },
          {
            "$userData.lastName$": {
              [Op.like]: `%${text}%`,
            },
          },
          {
            "$userData.email$": {
              [Op.like]: `%${text}%`,
            },
          },
          {
            courseName: {
              [Op.like]: `%${text}%`,
            },
          },
          {
            passingYear: {
              [Op.like]: `%${text}%`,
            },
          }
          ] 
        }
    }] 
          });
       
          console.log(column,"}}}}");
          console.log(order,"}}}}");
          console.log(orderCol,"}}}}");
          console.log(orderDir,"}}}}");
          console.log(orderby,"}}}}");    
       
   return res.json({ data: result});
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { addData, getAllData, data };
