const express = require("express")
const route = express.Router()

// { api (first route) er shamne slash "/" dewya mandatory }
route.get("/api/sajjad",(req,res)=>{
    res.json({
        name: 'sajjad',
        age: "22",
        type: 'regular'
    })
})
route.get("/hello/hi/bye",(req,res)=>{
    res.end("hello bolods ");
})

module.exports = {route}