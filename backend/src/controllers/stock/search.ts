import { Request, RequestHandler } from 'express';
import axios from 'axios';
import requestMiddleware from '../../middleware/request-middleware';
import Book from '../../models/Book';

type rangeKeyWord = '1D' | '1W' | '1M' | '1Y';
const response = {
  status: 500,
  error: '',
  data: null
};
/**
 * Builds a mongoose query object to search books according to book name and author name.
 * @param name String containing the book name or part of the book's name
 * @param author String containing the author name or part of the author's name
 */
const stockSeachQuery = async (
  id?: string,
  name?: string,
  range?: rangeKeyWord
): Promise<{ [key: string]: any; }> => {
  const query: any = {};
  try {
    let stocks: any[] = [];
    const { data, status } = await axios.get(
      'https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1Y.json'
    );
    stocks = data.filter((item: { [x: string]: any; }) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in query) {
        if (item[key] === undefined || item[key] !== query[key]) return false;
      }
      return true;
    });

    return stocks;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      response.status = error.response?.status || 500;
      response.error = error.message;
    } else {
      response.error = `unexpected error: ${error}`;
    }
    return response;
  }
};

interface SearchReqBody {
  id?: string;
  name?: string;
  range?: rangeKeyWord;
}

const search: RequestHandler = async (
  req: Request<{}, {}, {}, SearchReqBody>,
  res
) => {
  const { id, name, range } = req.query;

  const stocks = stockSeachQuery(id, name, range);
  res.send({ stocks });
};

export default requestMiddleware(search);
