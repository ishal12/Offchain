import { Router } from 'express';
import { countFeed, countLivestock, countTransfer, fetchFeed, fetchFeeds, fetchLivestock, fetchLivestocks, fetchTransfers } from '../services/livestock.services';
import { fetchUser } from '../services/user.services';
import { IFeedType, IUser, ILivestock, ILivestockDocument } from '../types';

let Livestock = require("../models/livestock.model");
let Feed = require("../models/feed.model")
let User = require("../models/user.model")
let Transfer = require("../models/transfer.model")
const router = Router();

router.route('/:address').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Promise.all([
    fetchLivestocks({ address: req.params.address }).skip(offset).limit(perPage),
    countLivestock({ address: req.params.address }),
  ]).then(val => {
    res.json({
      livestocks: val[0],
      count: val[1],
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));

  // fetchLivestock({ address: req.params.address }).skip(offset).limit(perPage)
  //   .then((_livestocks: ILivestock[]) => livestocks = _livestocks)
  //   .catch((err: Error) => res.status(400).json('Error: ' + err));

  // countLivestock({ address: req.params.address })
  //   .then((_count: number) => count = _count)
  //   .catch((err: Error) => res.status(400).json('Error: ' + err));
  // res.json({ livestocks, count });
});

router.route('/testing').get((req, res) => {
  Livestock.countDocuments({})
    .then((livestocks: ILivestock) => res.json(livestocks))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/select/:address').get((req, res) => {
  fetchLivestock({ address: req.params.address, alive: { $in: [true] } })
    .then((livestocks: ILivestock) => res.json(livestocks))
    .catch((err: Error) => res.status(400).json('Error: ' + err))

  // Livestock.find({ address: req.params.address, alive: { $in: [true] } })
  //   .then((livestocks: ILivestock) => res.json(livestocks))
  //   .catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/ls/:id').get((req, res) => {
  fetchLivestock({ id: req.params.id })
    .then((livestocks: ILivestock) => res.json(livestocks))
    .catch((err: Error) => res.status(400).json('Error: ' + err))
});

router.route('/weightRecord/:id').patch((req, res) => {
  Livestock.findOne({ id: req.params.id })
    .then((livestocks: ILivestockDocument) => {
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
  fetchFeed({ id: req.params.id })
    .populate('_livestock')
    .then((feed: IFeedType) => res.json(feed))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/feedRecord/:id').get((req, res) => {
  const offset = Number(req.query.offset);
  const perPage = Number(req.query.perPage);

  Promise.all([
    fetchFeeds({ id: req.params.id }).sort({ '_id': -1 }).skip(offset).limit(perPage),
    countFeed({ id: req.params.id }),
  ]).then(val => {
    res.json({
      feed: val[0],
      count: val[1]
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));
});

// router.route('/transfer/:id').patch((req, res) => {
//   Livestock.findOne({ id: req.params.id })
//     .then((livestocks: ILivestock) => {
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
  fetchUser({ address: req.body.addressFrom })
    .then((userFrom: IUser) => {
      fetchUser({ address: req.body.addressTo })
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

  Promise.all([
    fetchTransfers({ id: req.params.id }).sort({ '_id': -1 }).skip(offset).limit(perPage),
    countTransfer({ id: req.params.id })
  ]).then(val => {
    res.json({
      transfer: val[0],
      count: val[1]
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));
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

  Promise.all([
    fetchLivestocks().skip(offset).limit(perPage),
    countLivestock()
  ]).then(val => {
    res.json({
      livestocks: val[0],
      count: val[1]
    })
  }).catch((err: Error) => res.status(400).json('Error: ' + err));
})

export const routerLivestock = router;
