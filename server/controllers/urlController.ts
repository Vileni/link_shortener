import { Request, Response, NextFunction } from 'express';
import validUrl from 'valid-url';
import validator from 'validator';
import shortid from 'shortid';
import Url, { IUrl } from '../models/urlModel';
import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// CREATES SHORT LINKS!
const createShortUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<Response | NextFunction | void> => {
    const { url } = req.body;
    const baseUrl = process.env.BASE_URL as string;

    if (url) {
      if (!validator.isURL(url)) {
        return next(new AppError('url is invalid!', 400));
      }
      if (!validUrl.isUri(baseUrl)) {
        return next(new AppError('Base_url is invalid!', 400));
      }
      const ending = shortid.generate();
      const shortUrl = baseUrl + ending;

      // @ts-ignore
      if (req.user) {
        // @ts-ignore
        const { id: owner } = req.user;

        const link = await Url.create({ url, ending, shortUrl, owner });
        await User.findByIdAndUpdate({ _id: owner }, { $push: { linksCreated: link.id } });
        return res.status(201).json({
          status: 'success',
          link: link.shortUrl,
        });
      }
      // default owner if it ganarated without authentication
      // if it is needed we can easily track no authenticated users links
      const defaultOwer = '60e49af6f1db8b1c98b08e65';
      const link = await Url.create({ url, ending, shortUrl, owner: defaultOwer });
      return res.status(201).json({
        status: 'success',
        link: link.shortUrl,
      });
    }
    return next(new AppError('Please Provide URL', 400));
  }
);

/** records visits to each shortened url
keeps analytics stats for given url (e.g. unique visitors)
*/
const redirect = catchAsync(
  async (req: Request | any, res: Response, next: NextFunction): Promise<Response | NextFunction | void> => {
    const { ending } = req.params;
    // unique visits implimentation;
    // if this node js application was behinde nginx reverse proxy bottom line would get Real ip;
    // const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    const ip = process.env.IP as string;
    const link = await Url.findOne({ ending });
    // keeps analytics stats for user (e.g. links they visited)

    // 1) if there is user save info in users own document,
    if (!link) {
      return res.status(200).json({
        status: 'NoLink',
      });
    }

    if (req.user) {
      console.log('thre is user');
      const { user } = req;
      const { visited } = req.user;
      const { shortUrl } = link as IUrl;
      console.log(visited, 'visited');
      if (link && user && !visited.includes(shortUrl)) {
        const { id } = req.user;
        await User.findOneAndUpdate(
          { _id: id },
          {
            $push: { visited: link.shortUrl },
          }
        );
      }
    }

    // 2)check if link exists and send to frotend
    if (link) {
      const { visitorsIP } = link;
      if (!visitorsIP.includes(ip)) {
        link.visitorsIP.push(ip);
        link.uniqueVisitors += 1;
        link.visits += 1;
      } else {
        link.visits += 1;
      }
      await link.save();

      return res.status(200).json({
        status: 'success',
        url: link.url,
      });
    }
    // default
    return next(new AppError('Something Went Wrong try later.', 401));
  }
);

const getAllMyInfo = catchAsync(async (req: Request | any, res: Response): Promise<Response | void> => {
  const { id } = req.user;
  const urls = await User.findById(id, '-password').populate('linksCreated', {
    visits: 1,
    uniqueVisitors: 1,
    shortUrl: 1,
  });

  res.status(200).json({ status: 'success', urls });
});

/** 
//implimentation to track no authenticated users links.
const getLonelyUrls = catchAsync(async (req: Request, res: Response): Promise<Response | void> => {
const urls = await Url.find({ _id: 'adminId' });
res.status(200).json({ status: 'success', urls });
 });
 */

export { createShortUrl, redirect, getAllMyInfo };
