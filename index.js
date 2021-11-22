var http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');

const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());
app.set('json spaces', 2);

/*http.createServer({}, app).listen(port, function () {
    console.log('Servidor https correindo en el puerto 5000');
});*/

app.get('/pet', function (req, res) {
    let content = JSON.parse(fs.readFileSync('./DB/pet.json', 'utf8'));
    res.status(200).send(content);
});


app.get('/pet/:name', function (req, res) {
    let content = JSON.parse(fs.readFileSync('./DB/pet.json', 'utf8'));
    let name = req.params.name;
    const finds = content.mascotas.find(ele => ele.name === name);
    if (finds) {
        res.status(200).send(finds);
    } else {
        res.status(404).json({
            "method": "GET",
            "params": name,
            "message": `Not found ${name}`
        });
    }
});

app.post('/pet', function (req, res) {
    let content = JSON.parse(fs.readFileSync('./DB/pet.json', 'utf8'));
    let body = req.body;
    console.log(body);
    if (body != {}) {
        content.mascotas.push(body);
        fs.writeFileSync('./DB/pet.json', JSON.stringify(content));
        res.status(200).json({
            "method": "POST",
            "message": "SAVE",
            "body": body
        });
    }else{
        res.status(200).json({
            "method": "POST",
            "message": "SAVE",
            "body": "Datos viene vacios"
        });
    }
});

app.delete('/pet/:name', function (req, res) {
    let content = JSON.parse(fs.readFileSync('./DB/pet.json', 'utf8'));
    let name = req.params.name;
    const found = content.mascotas.find(ele => ele.name === name);
    if (found) {
        let index = 0;
        for (let i = 0; i < (content.mascotas).length; i++) {
            ele = content.mascotas[i]['name'];
            if (ele == name) {
                index = i;
            }
        }
        console.log("index:" + index);
        content.mascotas.splice(index, 1);
        fs.writeFileSync('./DB/pet.json', JSON.stringify(content));
        res.status(200).json({
            "method": "DELETE",
            "params": name,
            "message": `found ${name}`
        });
    } else {
        res.status(404).json({
            "method": "DELETE",
            "params": name,
            "message": `Not found ${name}`
        });
    }
});


app.listen(port, function (err) {
    if (err) console.log(err);
    console.log('Servidor escuchando')
});
