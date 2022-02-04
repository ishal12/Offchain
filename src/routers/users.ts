import { Router } from "express";
import { IUser } from "../types";
import { fetchUsers } from '../services/user.services';

let User = require('../models/user.model');
const router = Router();

router.route('/process/').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);
  var users: IUser[] = [];
  var counts: number = 0;

  fetchUsers({ status: { $in: ['2'] } }).skip(offset).limit(perPage)
    .then((user: IUser[]) => { users = user; })
    .catch((err: Error) => res.status(400).json('Error: ' + err));

  User.countDocuments({ status: { $in: ['2'] } })
    .then((count: number) => counts = count);
  res.json({ users, counts });
});

router.route('/activated/').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  User.find({ status: { $in: ['0', '1'] } }).skip(offset).limit(perPage)
    .then((users: IUser) => {
      User.countDocuments({ status: { $in: ['0', '1'] } })
        .then((count: number) => res.json({ users, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/home/').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  User.find({ role: { $in: ['0', '1'] }, status: { $in: ['0', '1'] } }).skip(offset).limit(perPage)
    .then((users: IUser) => {
      User.countDocuments({ role: { $in: ['0', '1'] }, status: { $in: ['0', '1'] } })
        .then((count: number) => res.json({ users, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/:address').get((req, res) => {
  const _address = req.params.address;
  User.findOne({ address: _address })
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