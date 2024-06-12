import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { Event } from './types/response';


class EventService {

    async getEventById(id: string): Promise<IEvent | null> {      
      return await EventModel.findById(id).exec();
    }


    async getEvents(): Promise<IEvent[]> {
      return await EventModel.find().exec(); 
    }


    async getEventsByCity(city: string): Promise<IEvent[]> {
      return await EventModel.find({ location: city }).exec();
    }


    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {      
      const { name, description, date, location ,duration} = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date: new Date(date),
        location,
        duration
      });
  
      await newEvent.save();
      return newEvent;
    }
    
    async updateEvent(id: string, eventUpdates: Partial<CreateEventDto>): Promise<IEvent | null> {
      return await EventModel.findByIdAndUpdate(id, eventUpdates, { new: true }).exec();
    } 
  }
  
  export default EventService;
  