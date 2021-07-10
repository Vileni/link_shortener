import { model, Schema, Document, Model } from 'mongoose';

export interface IUrl extends Document {
  ending: string;
  url: string;
  shortUrl: string;
  owner: string | null;
  uniqueVisitors: number;
  visits: number;
  visitorsIP: [string];
}
const urlschema: Schema = new Schema({
  ending: {
    type: String,
    required: [true, "URL's ending is required"],
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
  },
  shortUrl: {
    type: String,
    required: [true, 'shortUrl is required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  visits: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  visitorsIP: [
    {
      type: String,
    },
  ],
});

const Url: Model<IUrl> = model('Url', urlschema);

export default Url;
