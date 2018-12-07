import { LogicError } from '../utils/errors';

async function root(req, res, next) {
  try {
    // throw new LogicError('test_error')
    return res.json({ result: 'ok' });
  } catch (e) {
    // if you throw an error in the try block, it'll catch in this catch block
    // and it'll continue to the our error handling middleware
    next(e);
  }
}

export default {
  root,
};
