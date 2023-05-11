const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'ejs');

app.get('/',async(req,res)=>{
    res.render('combo.ejs');
})
const comboRoutes = require('./routes/combo.routes');
app.use('/',comboRoutes);

app.listen(port,async()=> {
    console.log("connected!!!");
})
//  <% for(let i=0;i<data.length;i++) {%>
//     <% if(data[i].comboType  == "dropdown") {%>
//         <li><select name="", id="">
//         <option value="">Select your <%= data[i].comboType %></option>
//         <% for(let j=0;j<data[i].options.length;i++) {%>
//     <option value="">${option[j].optionName}</option>
//             }
//     </select>
//     </li><br>
//    <% }%>
   
// <% } %>


// <% for(let i=0;i<data.length;i++) {%>
//     <%=i%>
  
//     <%=data[i].comboType%>
//     <% if(data[i].comboType=="dropdown"){%>

//         <li><select name="", id="">
//             <option value="">Select your <%=data[i].comboName %> </option>
//             <% for(let j=0;j<data[i].options.length;j++){ %>
//                 <option value=""><%= data[i].options[j].optionName %></option>
//             <% } %>
//         </select>
//     <%}%>
   
// <% } %> 