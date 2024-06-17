import { HttpError } from 'http-errors'; 

export const eerrorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.stauts(err.status).json({
            status: err.status,
            message: err.message,
            data: err,
        });
        return;
     };

    res.status(500).json({
        status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  };