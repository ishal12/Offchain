import { Router } from 'express';
import { ILivestockType, IFeedType, IUser, ITransferType } from '../types';

let Livestock = require("../models/livestock.model");
let Feed = require("../models/feed.model")
let User = require("../models/user.model")
let Transfer = require("../models/transfer.model")
const router = Router();

router.route('/:address').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Livestock.find({ address: req.params.address }).skip(offset).limit(perPage)
    .then((livestocks: ILivestockType) => {
      Livestock.countDocuments({ address: req.params.address })
        .then((count: number) => res.json({ livestocks, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/testing').get((req, res) => {
  Livestock.countDocuments({})
    .then((livestocks: ILivestockType) => res.json(livestocks))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/select/:address').get((req, res) => {
  Livestock.find({ address: req.params.address, alive: { $in: [true] } })
    .then((livestocks: ILivestockType) => res.json(livestocks))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/ls/:id').get((req, res) => {
  Livestock.findOne({ id: req.params.id })
    .then((livestocks: ILivestockType) => res.json(livestocks))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/weightRecord/:id').patch((req, res) => {
  Livestock.findOne({ id: req.params.id })
    .then((livestocks: ILivestockType) => {
      livestocks.weight = req.body.weight;
      livestocks.length = req.body.length;
      livestocks.heartGrith = req.body.heartGrith;

      livestocks
        .save()
        .then(() => res.json('Berat badan hewan telah diubah'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
});

router.route('/feedRecord/add/:id').post((req, res) => {
  const newFeed = new Feed({
    id: req.params.id,
    ...req.body
  })
  // console.log(newFeed)
  newFeed
    .save()
    .then(() => res.json('Pakan telah ditambahkan'))
    .catch((err: Error) => {
      res.status(400).json('Error: ' + err)
    })
});

router.route('/feedRecord/view/:id').get((req, res) => {
  Feed.findOne({ id: req.params.id })
    .populate('_livestock')
    .then((feed: IFeedType) => res.json(feed))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/feedRecord/:id').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Feed.find({ id: req.params.id }).sort({ '_id': -1 }).skip(offset).limit(perPage)
    .populate('_livestock')
    .then((feed: IFeedType) => {
      Feed.countDocuments({ id: req.params.id })
        .then((count: number) => res.json({ feed, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

// router.route('/transfer/:id').patch((req, res) => {
//   Livestock.findOne({ id: req.params.id })
//     .then((livestocks: ILivestockType) => {
//       User.findOne({ address: livestocks.address })
//         .then((user: IUser) => {
//           user.totalLivestock && user.totalLivestock--;

//           user.save()
//         })

//       livestocks.address = req.body.addressTo;

//       User.findOne({ address: req.body.addressTo })
//         .then((user: IUser) => {
//           user.totalLivestock && user.totalLivestock++;

//           user.save()
//         })

//       livestocks
//         .save()
//         .then(() => res.json('Kepemilikan berhasil dipindahkan'))
//         .catch((err) => res.status(400).json('Error: ' + err))
//     })
// });

router.route('/transfer/add/:id').post((req, res) => {
  User.findOne({ address: req.body.addressFrom })
    .then((userFrom: IUser) => {
      User.findOne({ address: req.body.addressTo })
        .then((userTo: IUser) => {
          var _from = '';
          var _to = '';

          if (userFrom !== null) {
            if (userFrom.role == Number(0)) {
              _from = 'farmer';
            } else if (userFrom.role == Number(1)) {
              _from = 'stocker';
            }
          }


          if (userTo.role == Number(0)) {
            _to = 'farmer';
          } else if (userTo.role == Number(1)) {
            _to = 'stocker';
          }

          const newTransfer = new Transfer({
            id: req.params.id,
            _livestock: req.body._livestock,
            from: req.body.addressFrom,
            to: req.body.addressTo,
            stateFrom: _from,
            stateTo: _to,
            txHash: req.body.txHash
          })
          // res.json({ body: 'test', after: newTransfer })
          newTransfer
            .save()
            .then(() => res.json('Riwayat transfer berhasil ditambahkan'))
            .catch((err: Error) => res.status(400).json('Error: ' + err))
        }).catch((err: Error) => res.status(400).json('Error: ' + err))
    }).catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/transfer/:id').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Transfer.find({ id: req.params.id }).sort({ '_id': -1 }).skip(offset).limit(perPage)
    .populate('_livestock')
    .then((transfer: ITransferType) => {
      Transfer.countDocuments({ id: req.params.id })
        .then((count: number) => res.json({ transfer, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

// router.route('/add').post((req, res) => {
//   const newLS = new Livestock({
//     alive: true,
//     ...req.body
//   });

//   newLS
//     .save()
//     .then(() => {
//       User.findOne({ address: req.body.address })
//         .then((user: IUser) => {
//           user.totalLivestock && user.totalLivestock++;

//           user.save()
//         })
//       res.json({ body: 'Hewan Ternak telah ditambahkan!', after: newLS })
//     })
//     .catch((err: Error) => res.status(400).json('Error: ' + err));
// });

router.route('/').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Livestock.find().skip(offset).limit(perPage)
    .then((livestocks: ILivestockType) => {
      Livestock.countDocuments({})
        .then((count: number) => res.json({ livestocks, count }));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
})

export const routerLivestock = router;