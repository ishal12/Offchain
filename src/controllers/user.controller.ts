import { Request, Response } from 'express';
import { countDoc, fetchUsers } from '../services/user.services';

export const getUserProcess = async (offset: number, perPage: number): Promise<Record<string, any>> => {
  const fetch = await Promise.all([
    fetchUsers({ status: { $in: ['2'] } }).skip(offset).limit(perPage),
    countDoc({ status: { $in: ['2'] } })
  ]);

  return { users: fetch[0], count: fetch[1] };
}

export const getUser = async (req: Request, res: Response) => {
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
}
