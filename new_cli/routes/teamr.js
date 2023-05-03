const teamData = require('../controller/teamc');
const express = require('express');
const app = express();

app.post('/addData',teamData.addData);
app.get('/getAllData', teamData.getAllData);
app.get('/getOneData', teamData.getOneData);
app.put('/:id',teamData.updateData);
app.delete('/:id',teamData.deleteData);

module.exports = app;