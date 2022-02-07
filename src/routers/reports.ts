import { Router } from 'express';
import { ISlaughterDocument, ITransferType } from '../types';
import moment from 'moment';
import { countLivestock, countSlaughter, countTransfer, fetchSlaughters, fetchTransfers } from '../services/report.services';
var Web3 = require('web3');
const SlaughterManager = require('../../SlaughterManager.json');

const router = Router();
let Livestock = require('../models/livestock.model');
let Slaughters = require('../models/slaughter.model');
let Transfer = require('../models/transfer.model');

router.route('/slaughter/total').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Promise.all([
    fetchSlaughters({ status: { $in: ['diterima', 'postmortem', 'packing'] } }).skip(offset).limit(perPage).populate('_livestock'),
    countSlaughter({ status: { $in: ['diterima', 'postmortem', 'packing'] } })
  ]).then(val => {
    res.json({
      slaughters: val[0],
      count: val[1]
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));

  // Slaughters.find({ status: { $in: ['diterima', 'postmortem', 'packing'] } }).skip(offset).limit(perPage)
  //   .populate('_livestock')
  //   .then((slaughters: ISlaughterDocument) => {
  //     Slaughters.countDocuments({ status: { $in: ['diterima', 'postmortem', 'packing'] } })
  //       .then((count: number) => res.json({ slaughters, count }));
  //   })
  //   .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/transfer/total').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Promise.all([
    fetchTransfers().sort({ '_id': -1 }).skip(offset).limit(perPage).populate('_livestock'),
    countTransfer()
  ]).then(val => {
    res.json({
      transfers: val[0],
      count: val[1]
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));

  // Transfer.find({}).sort({ '_id': -1 }).skip(offset).limit(perPage)
  //   .populate('_livestock')
  //   .then((transfers: ITransferType) => {
  //     Transfer.countDocuments({})
  //       .then((count: number) => res.json({ transfers, count }));
  //   })
  //   .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/dashboard').get((req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Promise.all([
    countLivestock({ alive: { $in: [true] } }),
    countLivestock({ alive: { $in: [true] }, createdAt: { $gte: startOfToday } }),
    countLivestock({ alive: { $in: [false] } }),
    countLivestock({ alive: { $in: [false] }, createdAt: { $gte: startOfToday } }),
    countLivestock({}),
    countLivestock({ createdAt: { $gte: startOfToday } }),
    countSlaughter({ status: { $in: ['diterima', 'postmortem', 'packing'] } }),
    countSlaughter({ status: { $in: ['diterima', 'postmortem', 'packing'] }, createdAt: { $gte: startOfToday } }),
    countTransfer({}),
    countTransfer({ createdAt: { $gte: startOfToday } }),
  ]).then(val => {
    res.json({
      alive: val[0],
      aliveU: val[1],
      dead: val[2],
      deadU: val[3],
      total: val[4],
      totalU: val[5],
      slaughter: val[6],
      slaughterU: val[7],
      transfer: val[8],
      transferU: val[9]
    })
  })
})

const convertMomentDate = (date: number) => {
  return moment.unix(date / 1000000).format("MMMM Do YYYY, h:mm a")
}

/** REPORT WEIGHT WITH LINE CHART
 *    Maybe can use blockchain as a report
 *    example, take last 10 data and make line chart
 */
router.get('/blockchain/wRecord/line/:id', async (req, res) => {
  const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
  const deployedNetwork = SlaughterManager.networks[5777];
  var contract = new web3.eth.Contract(SlaughterManager.abi, deployedNetwork.address);
  var weight = [];
  var date = [];
  const id = parseInt(req.params.id) - 1;
  moment.locale('id');
  try {
    const ls = await contract.methods.livestocks(id).call();
    const count = ls.wrCount;
    var takeData = 0;
    var last = 5;
    var countOut = last;

    if (count < last) {
      takeData = 0;
      countOut = count
    } else if (count >= last) {
      takeData = count - last;
    }

    // take weight only form newest record
    for (var i = takeData; i <= (count - 1); i++) {
      const weightR = await contract.methods.wRecords(id, i).call();
      const data = weightR.weight;
      const x = weightR.timeRecord;
      weight.push(data);
      date.push(convertMomentDate(x));
    }
    res.json({ weight, date, countOut });
  } catch (e) {
    res.json(e);
  }
})

export const routerReport = router;
