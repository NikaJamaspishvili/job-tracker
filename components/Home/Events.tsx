"use client";

import { useEffect, useState,useTransition } from "react"
import { X, Plus, Calendar, Clock, MapPin,Trash2 } from "lucide-react";
import { insertEvents,deleteEvent,getEvents } from "@/server/events/main";
import {events,eventSchema} from "@/schema/events";
import Loading from "../Loading";

interface Props{
  setShowEvents: React.Dispatch<React.SetStateAction<boolean>>
}

const Events = ({setShowEvents}:Props) => {
  const [addEvents,setAddEvents] = useState(false);
  const [events,setEvents] = useState<events[]>([]);
  const [isPending,startTransition] = useTransition();

  useEffect(()=>{
      startTransition(async ()=>{
        const result = await getEvents();
        if(result.success){
          setEvents(result.data);
        }
      })
  },[]);

  const handleDelete = async (id?:number) => {
      const newEvents = events.filter((event:events) => event.id !== id);
      setEvents(newEvents);
      await deleteEvent(id as number);
  }

  if(isPending) return <Loading />
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Events</h2>
          <button 
            type="button" 
            className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200" 
            onClick={() => setShowEvents(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Add Event Button */}
          <button 
            onClick={()=>setAddEvents(true)}
            className="mb-6 cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <Plus size={20} />
            Add New Event
          </button>

          {/* Add Event Form */}
          {addEvents && <AddEvent setAddEvents={setAddEvents} setEvents={setEvents} />}

          {/* Events List */}
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 text-lg">No events yet</p>
                <p className="text-gray-400">Create your first event to get started</p>
              </div>
            ) : (
              events.map(result => (
                <div key={result.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{result.event_name}</h3>
                    <section className="flex flex-col gap-3">
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {result.event_location === "online" ? "Online" : "On-site"}
                    </div>
                    <button className="cursor-pointer" onClick={()=>handleDelete(result.id)}><Trash2 className="text-red-500 ml-auto w-[20px] h-[20px]"/></button>
                    </section>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{new Date(result.event_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-gray-400" />
                      <span>{result.event_time}</span>
                    </div>
                    {result.event_location !== "online" && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{result.event_location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const AddEvent = ({setAddEvents,setEvents}:{setAddEvents: React.Dispatch<React.SetStateAction<boolean>>,setEvents: React.Dispatch<React.SetStateAction<events[]>>}) => {
  const [isOnline,setIsOnline] = useState<boolean>(true);
  const [isPending,startTransition] = useTransition();
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Handle location field properly
    if (isOnline) {
      data.event_location = "online";
    }

    const validatedResult = eventSchema.safeParse(data);
    
    if(!validatedResult.success){
        const errorMap: {[key: string]: string} = {};
        validatedResult.error.issues.forEach(issue => {
            const field = issue.path[0] as string;
            errorMap[field] = issue.message;
        });
        setErrors(errorMap);
        return;
    }

    // Clear errors if validation passes
    setErrors({});

    startTransition(async ()=>{
      const result = await insertEvents(data as unknown as events);
      if(result.success){
        // Create a plain object with the event data
        const newEvent: events = {
          id: result.id,
          event_name: data.event_name as string,
          event_date: data.event_date as string,
          event_time: data.event_time as string,
          event_location: isOnline ? "online" : (data.event_location as string)
        };
        
        setEvents((prev)=>{
            return [newEvent,...prev];
        });
        setAddEvents(false);
      }
    })
  }

  const clearError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return (
    <div className="mb-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Event</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
          <input 
            name="event_name" 
            type="text" 
            placeholder="Enter event name..." 
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
              errors.event_name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            }`}
            
            onChange={() => clearError('event_name')}
          />
          {errors.event_name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-600 rounded-full"></span>
              {errors.event_name}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input 
              name="event_date" 
              type="date" 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.event_date ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              
              onChange={() => clearError('event_date')}
            />
            {errors.event_date && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.event_date}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input 
              name="event_time" 
              type="time" 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.event_time ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              
              onChange={() => clearError('event_time')}
            />
            {errors.event_time && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.event_time}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
          <select 
            onChange={(e)=>{
              setIsOnline(e.target.value === "online");
              clearError('event_location');
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="online">Online</option>
            <option value="on-site">On-Site</option>
          </select>
        </div>

        {!isOnline && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input 
              name="event_location" 
              type="text" 
              placeholder="Enter event location..." 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.event_location ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              
              onChange={() => clearError('event_location')}
            />
            {errors.event_location && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.event_location}
              </p>
            )}
          </div>
        )}



        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            disabled={isPending}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            {isPending ? "Creating..." : "Create Event"}
          </button>
          <button 
            type="button"
            onClick={() => setAddEvents(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) 
}

export default Events
