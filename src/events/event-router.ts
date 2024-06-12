import { Router } from 'express';
import EventController from './event-controller';
import EventService from './event-service';
import { authMiddleware } from '../middlewares/authMiddleware';
import AuthService from '../auth/auth-service';


const eventRouter = Router();

const eventService = new EventService();
const userService = new AuthService();
const eventController = new EventController(eventService, userService);

eventRouter.get('/events/:id', eventController.getEventById);
eventRouter.get('/events', authMiddleware, eventController.getEvents);
eventRouter.post('/events', eventController.createEvent);
eventRouter.put('/events/:id', eventController.updateEvent);

export default eventRouter;
