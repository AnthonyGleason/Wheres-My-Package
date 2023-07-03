//create a new express app
import express from 'express';
const app = express();
//////////////////////////////
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
//import Types
import { Request, Response, NextFunction } from 'express';
//import api router
import { apiRouter } from './routes/api';
//setup cors
import cors from 'cors';
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//use routes
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});
// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// start the server
const port:string = process.env.PORT || '5000';
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});