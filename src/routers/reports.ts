import { Router } from 'express';
import { ISlaughterType, ITransferType } from '../types';
import moment from 'moment';
var Web3 = require('web3');
const SlaughterManager = require('../../../bc-trace/client/src/contracts/SlaughterManager.json');

const router = Router();
let Livestock = require('../models/livestock.model');
let Slaughters = require('../models/slaughter.model');
let Transfer = require('../models/transfer.model');

router.route('/slaughter/total').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Slaughters.find({ status: { $in: ['diterima', 'postmortem', 'packing'] } }).skip(offset).limit(perPage)
    .populate('_livestock')
    .then((slaughters: ISlaughterType) => {
      Slaughters.countDocuments({ status: { $in: ['diterima', 'postmortem', 'packing'] } })
        .then((count: number) => res.json({ slaughters, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/transfer/total').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Transfer.find({}).sort({ '_id': -1 }).skip(offset).limit(perPage)
    .populate('_livestock')
    .then((transfers: ITransferType) => {
      Transfer.countDocuments({})
        .then((count: number) => res.json({ transfers, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/dashboard').get((req, res) => {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Promise.all([
    Livestock.countDocuments({ alive: { $in: [true] } }),
    Livestock.countDocuments({ alive: { $in: [true] }, createdAt: { $gte: startOfToday } }),
    Livestock.countDocuments({ alive: { $in: [false] } }),
    Livestock.countDocuments({ alive: { $in: [false] }, createdAt: { $gte: startOfToday } }),
    Livestock.countDocuments({}),
    Livestock.countDocuments({ createdAt: { $gte: startOfToday } }),
    Slaughters.countDocuments({ status: { $in: ['diterima', 'postmortem', 'packing'] } }),
    Slaughters.countDocuments({ status: { $in: ['diterima', 'postmortem', 'packing'] }, createdAt: { $gte: startOfToday } }),
    Transfer.countDocuments({}),
    Transfer.countDocuments({ createdAt: { $gte: startOfToday } }),
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
