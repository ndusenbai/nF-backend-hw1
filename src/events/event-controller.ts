import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';
import AuthService from '../auth/auth-service';

class EventController {
    private eventService : EventService;
    private authService: AuthService;


    constructor(eventService : EventService, authService: AuthService){
        this.eventService = eventService;
        this.authService = authService
    } 

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
          const createEventDto: CreateEventDto = req.body;
          const event = await this.eventService.createEvent(createEventDto);
          res.status(201).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }

    
    updateEvent = async (req: Request, res: Response): Promise<void> => {
      try {
        const { id } = req.params
        const eventUpdates = req.body;

        const event = await this.eventService.getEventById(id);

        if (!event) {
          res.status(404).json({ message: 'Event not fount'});
          return;
        }
        
        const updatedEvent = await this.eventService.updateEvent(id, eventUpdates);

        res.status(200).json(updatedEvent)
      } catch (error: any) {
        res.status(500).send({ error: error.message })
      }
    }


    getEvents = async (req: Request, res: Response): Promise<void> => {
      try {
        const userId = req.user?.id;
        const user = await this.authService.getUserById(userId);
        if (!user) {
          res.status(404).json({ message: 'Пользователь не найден' });
          return;
        }
  
        const events = await this.eventService.getEventsByCity(user.city);
        res.status(200).json(events);
      } catch (error: any) {

        try {
          const events = await this.eventService.getEvents();
          res.status(200).json(events);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }
 
    }


    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
          const event = await this.eventService.getEventById(id);
          if (!event) {
            res.status(404).json({ message: 'Событие не найдено' });
            return;
          }
          res.status(200).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }
}

export default EventController;