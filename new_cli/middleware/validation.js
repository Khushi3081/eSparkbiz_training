const joi_pack = require('joi');

const validateWithMiddle = async (req,res,next)=> {
    const createSchema = await joi_pack.object().keys({
        playerName:joi_pack.string().required(),
        playerEmail:joi_pack.string().email(),
        playerGame:joi_pack.string().required(),
    }).unknown(true)

    const {error} = createSchema.validate(req.body);
    if(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
    else{
        next();
    }
}

const validate = async (req,res,next) =>{
    console.log(req.params);
    const updateSchema =joi_pack.object({

            id: joi_pack.required()
      
    }).unknown(true)
    // await joi_pack.object({id:joi_pack.required()})
    const {error} = updateSchema.validateAsync(req.params);
    if(error) {
        console.log(error);
        const details = error
        res.status(404).json({error:details})
    }

}

const validateData = async (req,res,next) => {
    const validateActor = joi_pack.object().keys({
        actorName : joi_pack.string().required(),
        // movieName : joi_pack.string().required()
        movieInfos:joi_pack.array().items(joi_pack.object({
            movieName : joi_pack.string().required()
        }))
    })
    const {error} = validateActor.validate(req.body);
    if(error) {
        const {details} = error;
        res.status(404).json({error:details})
    }
    else{
        next();
    }
    }
module.exports = {validateWithMiddle,validate,validateData};