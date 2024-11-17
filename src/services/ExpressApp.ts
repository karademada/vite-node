import Express,{ Application } from "express"
import userRouter from '../routes/userRoutes';

export default async (app:Application) => {
    app.use(Express.json());
    app.use(Express.urlencoded({ extended: true }));

    app.use('/api/user',userRouter)

    return app
}