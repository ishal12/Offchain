import { Router } from "express";
import { IUser } from "../types";
import { countDoc, fetchUser, fetchUsers } from '../services/user.services';

let User = require('../models/user.model');
const router = Router();

router.route('/process/').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Promise.all([
    fetchUsers({ status: { $in: ['2'] } }).skip(offset).limit(perPage),
    countDoc({ status: { $in: ['2'] } })
  ]).then(val => {
    res.json({
      users: val[0],
      count: val[1]
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));

});

router.route('/activated/').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Promise.all([
    fetchUsers({ status: { $in: ['0', '1'] } }).skip(offset).limit(perPage),
    countDoc({ status: { $in: ['0', '1'] } })
  ]).then(val => {
    res.json({
      users: val[0],
      counts: val[1]
    });
  }).catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/home/').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Promise.all([
    fetchUsers({ role: { $in: ['0', '1'] }, status: { $in: ['0', '1'] } }).skip(offset).limit(perPage),
    countDoc({ role: { $in: ['0', '1'] }, status: { $in: ['0', '1'] } })
  ]).then(val => {
    res.json({
      users: val[0],
      counts: val[1]
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/:address').get((req, res) => {
  fetchUser({ address: req.params.address })
    .then((user: IUser) => res.json(user))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const address = req.body.address;
  const name = req.body.name;
  const role = req.body.role;
  const status = 2;
  const txHash = req.body.txHash;
  const totalLivestock = Number(0);

  const newUser = new User({
    address,
    name,
    role,
    status,
    totalLivestock,
    txHash,
  })

  newUser
    .save()
    .then(() => res.json('User telah ditambahkan!'))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

// TODO: cari interface user patch
// router.route('/activate/:address').patch((req, res) => {
//   User.findOne({ address: req.params.address }).then((user: IUser) => {
//     user.status = 1;
//     user.txHash = req.body.txHash;

//     user
//       .save()
//       .then(() => res.json('User telah ditambahkan di jaringan blockchain!'))
//       .catch((err: Error) => res.status(400).json('Error: ' + err))
//   })
// });

// router.route('/toggle/:address').patch((req, res) => {
//   var status = 'tidak aktif';
//   User.findOne({ address: req.params.address }).then((user: IUser) => {
//     console.log('toggle')
//     if (user.status === 0) {
//       user.status = 1;
//       status = 'aktif';
//     } else if (user.status === 1) {
//       user.status = 0;
//       status = 'tidak aktif'
//     }
//     user.txHash = req.body.txHash;

//     user
//       .save()
//       .then(() => res.json(`address: ${req.params.address} \nBerhasil diubah menjadi ${status}.`))
//       .catch((err: Error) => res.status(400).json('Error: ' + err))
//   })
// });

export const routerUser = router;