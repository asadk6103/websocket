const express = require("express");
const http = require("http");
const https = require("https");
const Websocket = require("ws");
const port = 6667;
const server = https.createServer({express})
const wss = new Websocket.Server({server})

wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === Websocket.OPEN) {
                client.send(data);
            }
        })
    })
})

server.listen(port, () => {
    console.log("Hurray Port is listening");
})