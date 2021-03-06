import { Router } from "express";
import { countSlaughter, fetchSlaughters } from "../services/slaughter.services";
import { ILivestockDocument, ISlaughterDocument } from "../types";

let Livestock = require("../models/livestock.model");
let Slaughter = require("../models/slaughter.model");
const router = Router();

router.route('/add/').post((req, res) => {
    const addressRPH = req.body.addressTo;
    const beefId = req.body.id;
    const _livestock = req.body._livestock;
    const age = req.body.age;
    const status = 'diproses';

    const newBeef = new Slaughter({
        addressRPH,
        beefId,
        _livestock,
        age,
        status
    });

    newBeef
        .save()
        .then(() => res.json('Hewan Ternak telah dikirim ke RPH'))
        .catch((err: Error) => {
            res.status(400).json('Error: ' + err)
        })
})

router.route('/:address').get((req, res) => {
    const offset = Number(req.query.offset);
    const perPage = Number(req.query.perPage);

    Promise.all([
        fetchSlaughters({ addressRPH: req.params.address, status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } }).skip(offset).limit(perPage).populate('_livestock'),
        countSlaughter({ addressRPH: req.params.address, status: { $in: ['diproses', 'diterima', 'antemortem', 'postmortem'] } })
    ]).then(val => {
        res.json({
            slaughter: val[0],
            count: val[1]
        })
    }).catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/ditolak/:address').get((req, res) => {
    const offset = Number(req.query.offset);
    const perPage = Number(req.query.perPage);

    Promise.all([
        fetchSlaughters({ addressRPH: req.params.address, status: { $in: ['produktif', 'bunting', 'lainnya'] } }).skip(offset).limit(perPage).populate('_livestock'),
        countSlaughter({ addressRPH: req.params.address, status: { $in: ['produktif', 'bunting', 'lainnya'] } })
    ]).then(val => {
        res.json({
            Slaughter: val[0],
            count: val[1]
        })
    }).catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/diterima/:address').get((req, res) => {
    const offset = Number(req.query.offset);
    const perPage = Number(req.query.perPage);

    Promise.all([
        fetchSlaughters({ addressRPH: req.params.address, status: { $in: ['diterima', 'postmortem', 'packing'] } }).skip(offset).limit(perPage).populate('_livestock'),
        countSlaughter({ addressRPH: req.params.address, status: { $in: ['diterima', 'postmortem', 'packing'] } })
    ]).then(val => {
        res.json({
            Slaughter: val[0],
            count: val[1]
        })
    }).catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/ante').patch((req, res) => {
    const beefId = req.body.beefId;
    const id = req.body.id;
    const jenisAlasan = req.body.jenisAlasan;
    const alasan = req.body.alasan;
    const approval = req.body.approval;

    Slaughter.findOne({ _id: id })
        .then((slaughter: ISlaughterDocument) => {
            slaughter.txAnte = req.body.txAnte;

            if (approval) {
                slaughter.status = 'antemortem';
            } else {
                slaughter.status = jenisAlasan;
            }

            slaughter
                .save()
                .then(() => {
                    if (approval) {
                        res.json(`BeefId ${beefId} telah melewati pengecekan Antemortem.`);
                    } else {
                        res.json(`BeefId ${beefId} tidak dapat melewati pengecekan Antemortem dikarenakan ${alasan}.`);
                    }
                })
                .catch((err) => res.status(400).json('Error: ' + err));
        })
})

router.route('/post').patch((req, res) => {
    const beefId = req.body.beefId;
    const id = req.body.id;
    const jenisAlasan = req.body.jenisAlasan;
    const alasan = req.body.alasan;
    const approval = req.body.approval;

    Slaughter.findOne({ _id: id })
        .then((slaughter: ISlaughterDocument) => {
            Livestock.findOne({ _id: slaughter._livestock })
                .then((livestock: ILivestockDocument) => {
                    livestock.alive = false

                    livestock
                        .save()
                        .then(() => res.json(`Livestock dengan id ${livestock.id} sudah disembelih.`))
                        .catch((err: Error) => res.status(400).json('Error: ' + err));
                })

            slaughter.txPost = req.body.txPost;

            if (approval) {
                slaughter.status = 'postmortem';
            } else {
                slaughter.status = jenisAlasan;
            }

            slaughter
                .save()
                .then(() => {
                    if (approval) {
                        res.json(`BeefId ${beefId} telah melewati pengecekan Postmortem.`);
                    } else {
                        res.json(`BeefId ${beefId} tidak dapat melewati pengecekan Postmortem dikarenakan ${alasan}.`);
                    }
                })
                .catch((err) => res.status(400).json('Error: ' + err));
        })
})

router.route('/packing').patch((req, res) => {
    const beefId = req.body.beefId;
    const id = req.body.id;

    Slaughter.findOne({ _id: id })
        .then((slaughter: ISlaughterDocument) => {
            slaughter.txPack = req.body.txPack;
            slaughter.status = 'packing';

            slaughter
                .save()
                .then(() => {
                    res.json(`BeefId ${beefId} telah dipacking.`);
                })
                .catch((err) => res.status(400).json('Error: ' + err));
        })
})

export const routerSlaughter = router;