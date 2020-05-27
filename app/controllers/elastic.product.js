let client = require("../../config/elastic");
const express = require('express')

let createIndex = (req,res) => {
    console.log(req.body)
  client.indices.create(
    {
      index: req.body.indexName,
    },
    (err, resp, status) => {
      if (err) {
        console.log(err);
      } else {
        res.status(status)
        console.log("create", resp);
        return res.json(resp)
      }
    }
  );
};

let deleteIndex = (req,res) => {
  client.indices.delete({ index: req.body.indexName }, (err, resp, status) => {
    console.log("delete", resp,status);
    res.status(status)
    return res.json(resp)
  });
};

let addDocument = (req,res) => {
  client.index(
    {
      index: req.body.indexName,
      type: req.body.type,
      body: {
        name: req.body.name,
        age:req.body.age
      },
    },
    (err, resp, status) => {
      if(!err){
        res.status(status)
        return res.json(resp)
      }
    }
  );
};

let delDocument = (req,res) => {
  client.delete(
    { index: req.body.indexName, id: req.body.id, type: req.body.type },
    (err, resp, status) => {
      console.log("delete", resp);
      res.status(status)
      return res.json(resp)
    }
  );
};

let infoDocument = (req,res) => {
    console.log(req.query)
      client.count({ index: req.body.indexName, type: req.body.type}, (err, resp, status) => {
    console.log("constitute", resp);
    res.status(status)
    res.json(resp)
  });
};

let searchDocument = (req,res) => {
  client.search(
    {
      index: req.body.indexName,
      type: req.body.type
    },
    (err, resp, status) => {
      if (err) {
        console.log("search error: " + err);
      } else {
        console.log("--- Response ---");
        console.log(resp);
        console.log("--- Hits ---");
        resp.hits.hits.forEach(function (hit) {
          console.log(hit);
        });
        res.status(status)
        return res.json(resp)
      }
    }
  );
};

module.exports = {
    createIndex,
    deleteIndex,
    addDocument,
    delDocument,
    infoDocument,
    searchDocument
}