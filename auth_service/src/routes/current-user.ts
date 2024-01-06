import express, {Response, Request} from 'express';
import { currentUser } from '@sn1006/common'

const router = express.Router();

router.get('/currentuser', currentUser, (req: Request, res: Response) => {
    console.log(req.currentUser)
    res.send({currentUser: req.currentUser || null})
})

export { router as currentUserRouter }
