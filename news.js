const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const https = require('https');

const client = require("mailchimp-marketing");





const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function (req, res) { 
    res.sendFile(__dirname+"/signup.html");
 })

app.post("/", function (req, res) { 
    var name = req.body.name;
    var email = req.body.email;

    client.setConfig({
        apiKey: "7b088490411a7ba1a4469ea736f00ca4-us11",
        server: "us11",
      });
      
      const run = async () => {
        const response = await client.lists.addListMember("5500dbe417",
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name,
                
            },
        },
        {
            skipMergeValidation: false
        }
    );
};
// here
        
      
      run();

      res.sendFile(__dirname+"/success.html");


    // var data = {
    //     members: [
    //         {
    //             email_adress: email,
    //             status: "subscribed",
    //             merge_fields: {
    //                 FNAME : name
    //             }
    //         }
    //     ]
    // };

//     var jsonData = JSON.stringify(data);


//     const url = "https://us11.api.mailchimp.com/3.0/lists/5500dbe417/members?skip_merge_validation=false";
//     const options = {
//         method: "POST",
//         auth: "harshitisback:7b088490411a7ba1a4469ea736f00ca4-us11"
//     }
//    const request =  https.request(url, options, function (response) { 
//         response.on("data", function (data) { 
//             console.log(JSON.parse(data));
//          })
//      })

//      request.write(jsonData);
//      request.end();


 });



app.listen(process.env.PORT || 3000, function () { 
    console.log("server started");
 })


//  7b088490411a7ba1a4469ea736f00ca4-us11
// 5500dbe417