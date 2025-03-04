'use server'

import db from "@/db/drizzle";
import { ebus } from "@/db/schema";
import { count, sum, desc } from "drizzle-orm";

// Ebus Count, Discrepancy, Passengers
export async function fetchCardStat(){
    try{
      const EbusCountPromise = db.select({ count: count() }).from(ebus)
      const TotalDiscrepencyPromise = db.select({ sumDiscrepancy: sum(ebus.discrepancy) }).from(ebus);
      const TotalPassengersPromise = db.select({ sumTotalPassengers: sum(ebus.total_passengers)}).from(ebus);
      const CurrentPassengerPromise = db.select({ sumCurrentPassengers: sum(ebus.current_passengers)}).from(ebus);
      const data = await Promise.all([
        EbusCountPromise,
        TotalDiscrepencyPromise,
        TotalPassengersPromise,
        CurrentPassengerPromise
      ])
      const EbusCount = Number(data[0][0].count ?? '0'); 
      const TotalDiscrepency = Number(data[1][0].sumDiscrepancy ?? '0'); 
      const TotalPassengers = Number(data[2][0].sumTotalPassengers ?? '0'); 
      const CurrentPassengers = Number(data[3][0].sumCurrentPassengers ?? '0');
  
      return{
        EbusCount, TotalDiscrepency, TotalPassengers, CurrentPassengers
      }
    }
    catch (error) {
      console.error('Error fetching card stats:', error);
      throw new Error('Failed to fetch card statistics');
    }
  }

//Latest 5 ebus data
export async function fetch5LatestEbus() {
  try {
      const data = await db
      .select({
        license: ebus.license,
        route: ebus.route,
        total_passengers: ebus.total_passengers,
        current_passengers: ebus.current_passengers,
        date: ebus.dateRegistered,
        discrepancy: ebus.discrepancy,
        id: ebus.id
      })
      .from(ebus)
      .orderBy(desc(ebus.dateRegistered)) 
    .limit(5)

      // Ensure data is an array and not empty
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('No data found for the latest ebuses.');
        return [];
      }
      
      const latestEbus = data.map((bus) => ({
        ...bus,
        total_passengers: bus.total_passengers,
        current_passengers: bus.current_passengers,
      }))
  
    return latestEbus
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest invoices.')
  }
}