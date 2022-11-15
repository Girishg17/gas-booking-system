const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const GasBookingDatabase = require("./GasBookingDatabase");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const gasBookingDatabase = new GasBookingDatabase();

app.post("/api/register", (req, res) => {
    gasBookingDatabase.register(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.send("failure");
        }
    });
});

app.post("/api/login", (req, res) => {
    gasBookingDatabase.checkDealer(req.body, (status) => {
        if (status) {
            res.send({
                username: req.body.username,
                password: req.body.password,
                isDealer: true,
            });
        } else {
            gasBookingDatabase.checkUser(req.body, (status) => {
                if (status) {
                    res.send({
                        username: req.body.username,
                        password: req.body.password,
                        isDealer: false,
                    });
                } else {
                    res.send({ username: "", password: "" });
                }
            });
        }
    });
    
});

app.post("/api/book", (req, res) => {
    gasBookingDatabase.insertOrder(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.send("failure");
        }
    });
});

app.post("/api/getOrders", (req, res) => {
    gasBookingDatabase.getOrders(req.body.username, (result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.post("/api/getProfile", (req, res) => {
    gasBookingDatabase.getProfile(req.body.username, (result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.post("/api/updateProfile", (req, res) => {
    gasBookingDatabase.updateProfile(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.send("failure");
        }
    });
});

app.post("/api/getGasTypesByCompany", (req, res) => {
    gasBookingDatabase.getGasTypesByCompany(req.body,(result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.post("/api/getGasTypesByUser", (req, res) => {
    gasBookingDatabase.getGasTypesByUser(req.body,(result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.get("/api/getGasTypes", (_, res) => {
    gasBookingDatabase.getGasTypes((result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.get("/api/getGasCompanies", (req, res) => {
    gasBookingDatabase.getGasCompanies((result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});
app.post('/api/updatepassword',(req,res)=>{
    console.log(req.body);
    gasBookingDatabase.updatePassword(req.body,(status)=>{
        if(status){
            res.send("success");
        }else{
            res.send("failure");
        }
    });
})

app.post('/api/updateCompany', (req, res) => {
    gasBookingDatabase.updateCompany(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.send("failure");
        }
    });
});

app.post('/api/getDealerOrders', (req, res) => {
    gasBookingDatabase.getDealerOrders(req.body, (result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.post('/api/updateOrderStatus', (req, res) => {
    gasBookingDatabase.updateOrderStatus(req.body, (status) => {
        if (status) {
            res.send("success");
        } else {
            res.send("failure");
        }
    });
});

app.get('/api/getAllTables', (req, res) => {
    gasBookingDatabase.getAllTables((result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.post('/api/getTable', (req, res) => {
    gasBookingDatabase.getTable(req.body.table, (result) => {
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send([]);
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    gasBookingDatabase.connect();
});
