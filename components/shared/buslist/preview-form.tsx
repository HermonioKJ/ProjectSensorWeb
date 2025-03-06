'use server'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { editfetchebus } from "@/lib/actions/edit-add-ebus-actions"
import { fetchSensorData } from "@/lib/actions/modern-jeep-list-actions"
import { Info } from "lucide-react"

export default async function PreviewBusForm({ id }: { id: string }) {
    const [ebus] = await editfetchebus(id);
    const [sensorData] = await fetchSensorData(ebus.id) || [{}];
    
    //For disabling cards when no sensor
    const isSensorDataAvailable = sensorData && Object.keys(sensorData).length > 0;

    return (
        <div className="flex flex-row rounded-md md:p-6 gap-x-10 max-w-full">
            <div className="flex flex-col gap-y-5 w-[400px]">
                <Card className="px-3 justify-center items-center">
                    <CardTitle>
                        <CardHeader>
                            Ebus Status
                        </CardHeader>
                    </CardTitle>
                    <CardContent className="pt-3">
                        <div className="flex flex-col">
                            <div className="mb-4 flex flex-row w-[200px]">
                                <p className="block text-m font-medium">
                                    License No: {ebus.license}
                                </p>
                            </div>
                            <div className="mb-4 flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Route: {ebus.route}
                                </p>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Current Status: {ebus.status}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className={`opacity-0 h-0 ${!isSensorDataAvailable ? "pl-3 pb-3 opacity-100 justify-center items-center": ""}`}>
                        <div className="flex flex-row gap-x-3 text-red-500">
                        <Info/>
                        <p className="text-m font-bold justify-center items-center h-{100px} w-{250px}">
                        This ebus has no sensor linked currently.
                        </p>
                        </div>
                </div>

                <Card className={`px-3 justify-center items-center ${!isSensorDataAvailable ? "opacity-50 pointer-events-none" : ""}`}>
                    <CardTitle>
                        <CardHeader className="text-m">
                            Sensor Status
                        </CardHeader>
                    </CardTitle>
                    <CardContent>
                        <div className="pt-3 mb-4 flex flex-col gap-x-2">
                            <div className="mb-4 flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Sensor ID: {isSensorDataAvailable ? sensorData.id : "-"}
                                </p>
                            </div>
                            <div className="mb-4 flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Status: {isSensorDataAvailable ? sensorData.status : "-"}
                                </p>
                            </div>
                            <div className="mb-4 flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Current Passengers: {isSensorDataAvailable ? sensorData.passenger_count : "-"}/{ebus.total_passengers}
                                </p>
                            </div>
                            <div className="mb-4 flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Coordinates: {isSensorDataAvailable ? `${sensorData.latitude} , ${sensorData.longitude}` : "-"}
                                </p>
                            </div>
                            <div className="mb-4 flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Speed: {isSensorDataAvailable ? sensorData.speed : "-"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col items-center justify-center">
                <Card className="w-[500px] h-[500px]">
                    <CardContent className="items-center justify-center">GOOGLE MAP</CardContent>
                </Card>
            </div>
        </div>
    );
}