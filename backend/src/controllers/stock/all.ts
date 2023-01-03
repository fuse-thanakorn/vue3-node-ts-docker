import { RequestHandler } from 'express';
import axios from 'axios';
import requestMiddleware from '../../middleware/request-middleware';

const response = {
  status: 500,
  error: '',
  data: null
};
const all: RequestHandler = async (req, res) => {
  try {
    const { data, status } = await axios.get(
      'https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1Y.json',
    );

    return res.status(status).send({
      stock: data
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
