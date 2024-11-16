import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';

const app = express();

app.use(bodyParser.json())
app.use('/api/user',userRouter)
// HMR handling
if (import.meta.hot) {
    import.meta.hot.accept((newModule) => { 
      console.log('🔥 HMR update');
    });
  }


export const viteNodeApp = app;