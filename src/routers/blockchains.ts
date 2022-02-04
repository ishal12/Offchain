import { Router } from "express";
import { parse } from "path/posix";

const router = Router();
var Web3 = require('web3');
const SlaughterManager = require('../../../bc-trace/client/src/contracts/SlaughterManager.json');

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
const deployedNetwork = SlaughterManager.networks[5777];
var contract = new web3.eth.Contract(SlaughterManager.abi, deployedNetwork.address);

router.get('/livestock/:id', async (req, res) => {
  const id = parseInt(req.params.id) - 1;
  try {
    const ow = await contract.methods.livestockOwner(id).call();
    Promise.all([
      contract.methods.livestocks(id).call(), //ls
      contract.methods.livestockRace(id).call(), //rs
      contract.methods.users(ow).call(), //user
    ]).then(val => {
      res.json({ ls: val[0], race: val[1], owner: val[2] });
    })
  } catch (e) {
    res.json(e);
  }
})

router.get('/cowshed/:address', async (req, res) => {
  const address = req.params.address;
  try {
    const cowshed = await contract.methods.livestockCounts(address).call();
    res.json(cowshed);
  } catch (e) {
    res.json(e);
  }
})

router.get('/wRecord/:id', async (req, res) => {
  const offset = Number(req.query.offset); //0
  const perPage = Number(req.query.perPage); //2

  var record: any[] = [];
  const id = parseInt(req.params.id) - 1;
  try {
    const ls = await contract.methods.livestocks(id).call();
    const count: number = parseInt(ls.wrCount); //5
    var offsetFor: number = count - (1 + offset); //5-(1+-) = 4
    var perPageFor: number = offsetFor - (perPage - 1); //4 -(2-1) = 3

    if (perPageFor < 0) {
      perPageFor = 0;
    }

    const offsetArray = new Array(offsetFor).fill(true).map((e, i) => i + 1).filter(n => n > perPageFor);
    console.log(offsetArray);
    const getData = async (n: number, id: number) => {
      const weightR = await contract.methods.wRecords(id, n).call();
      const actor = await contract.methods.users(weightR.actor).call();
      return { weightR, actor };
    }

    Promise.all(offsetArray.map(a => getData(a, id)))
      .then((result) => {
        record = result;
        console.log(result);
      });

    res.json({ record, count });
  } catch (e) {
    console.log('error', e);
    res.json(e);
  }
})

router.get('/hRecord/:id', async (req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  var hr = [];
  const id = parseInt(req.params.id) - 1;
  try {
    const ls = await contract.methods.livestocks(id).call();
    const count = ls.hrCount;
    var offsetFor = ls.hrCount - (1 + offset);
    var perPageFor = offsetFor - (perPage - 1);

    if (perPageFor < 0) {
      perPageFor = 0;
    }

    for (var i = offsetFor; i >= perPageFor; i--) {
      const healthR = await contract.methods.hRecords(id, i).call();
      const actor = await contract.methods.users(healthR.actor).call();
      hr.push({ healthR, actor });
    }
    res.json({ hr, count });
  } catch (e) {
    res.json(e);
  }
})

router.get('/hRecords/:id', async (req, res) => {
  const perPage = Number(req.query.perPage);

  var hr = [];
  const id = parseInt(req.params.id) - 1;
  try {
    const ls = await contract.methods.livestocks(id).call();
    var offsetFor = ls.hrCount - (1 + 0);
    var perPageFor = offsetFor - (perPage - 1);

    if (perPageFor < 0) {
      perPageFor = 0;
    }

    for (var i = offsetFor; i >= 0; i--) {
      const healthR = await contract.methods.hRecords(id, i).call();
      const actor = await contract.methods.users(healthR.actor).call();
      hr.push({ healthR, actor });
    }
    res.json(hr);
  } catch (e) {
    res.json(e);
  }
})

router.get('/state/:id', async (req, res) => {
  var state = [];
  const id = parseInt(req.params.id) - 1;
  try {
    const ls = await contract.methods.livestocks(id).call();

    for (var i = 0; i < ls.stateCount; i++) {
      const stateData = await contract.methods.livestockStates(id, i).call();
      state.push(stateData);
    }
    res.json(state);
  } catch (e) {
    res.json(e);
  }
})

router.get('/transfer/:id', async (req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  var transfer = [];
  const id = parseInt(req.params.id) - 1;
  try {
    const ls = await contract.methods.livestocks(id).call();
    const count = ls.transferCount;
    var offsetFor = ls.transferCount - (1 + offset);
    var perPageFor = offsetFor - (perPage - 1);

    if (perPageFor < 0) {
      perPageFor = 0;
    }

    for (var i = offsetFor; i >= perPageFor; i--) {
      const transferData = await contract.methods.livestockTransfers(id, i).call();
      const owner = await contract.methods.users(transferData).call();
      (owner.timeCreated != '0') ? transfer.push({ owner, key: i }) : console.log('Tidak masuk');

    }
    res.json({ transfer, count });
  } catch (e) {
    res.json(e);
  }
})

router.get('/slaughter/:beefId', async (req, res) => {
  var transfer = [];
  const beefId = parseInt(req.params.beefId) - 1;
  try {
    const beef = await contract.methods.beefs(beefId).call();
    res.json(beef);
  } catch (e) {
    res.json(e);
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    const shed = await contract.methods.beefs(req.params.id).call();
    res.json(shed);
  } catch (e) {
    res.json(e);
  }
})

export const routerBlockchain = router;