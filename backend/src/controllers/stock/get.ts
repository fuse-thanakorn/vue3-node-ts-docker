import { Request, RequestHandler } from 'express';
import axios from 'axios';
import { DateTime } from 'luxon';
import requestMiddleware from '../../middleware/request-middleware';

interface SearchReqBody {
  pageSize?: number;
  pageNumber?: number;
  startDate?: string;
  endDate?: string;
}
interface responseType {
  status: number;
  error: string;
  data: any[] ;
  total: number ;
};
const response: responseType = {
  status: 500,
  error: '',
  data: [],
  total: 0
};
function paginate(array: any[], pageSize: number, pageNumber: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}
function filterDateRange(array: any[], start: string, end: string) {
  const startDate = DateTime.fromISO(start).startOf('day');
  const endDate = DateTime.fromISO(end).endOf('day');
  return array.filter(
    item => item['nav_date']
      && DateTime.fromISO(item['nav_date']) > startDate
      && DateTime.fromISO(item['nav_date']) <= endDate
  );
}
const all: RequestHandler = async (
  req: Request<{}, {}, {}, SearchReqBody>,
  res
) => {
  try {
    const {
      pageSize, pageNumber, startDate, endDate
    } = req.query;
    const { data, status } = await axios.get(
      'https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1Y.json'
    );
    const size = pageSize || 10;
    const page = pageNumber || 1;
    let stocks: any[] = data.data || [];
    const total: number = data.data.length;
    if (startDate && endDate) {
      const start = startDate || DateTime.now().plus({ months: -1 }).toISO();
      const end = endDate || DateTime.now().toISO();
      stocks = filterDateRange(stocks, start, end);
    }

    stocks = paginate(stocks, size, page);
    response.data = stocks;
    response.total = total;
    response.status = status;
    return res.status(status).send({
      stocks: response
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      response.status = error.response?.status || 500;
      response.error = error.message;
    } else {
      response.error = `unexpected error: ${error}`;
    }
    return res.status(response.status).send(response);
  }
};

export default requestMiddleware(all);
