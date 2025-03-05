'use server'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default async function PreviewBusForm() {
  return (
    <div className="flex flex-row rounded-md md:p-6 gap-x-20 max-w-full">

            <div className="flex flex-col gap-y-10">
                <Card className="px-5 pt-5 justify-center items-center">
                    <CardContent>
                        <div className="flex flex-col">
                            <div className="mb-4 flex flex-row w-[200px]">
                                <p className="block text-m font-medium">
                                    License No: <span>Test</span>
                                </p>
                            </div>

                            <div className="mb-4 flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Route: <span>Test</span>
                                </p>
                            </div>

                            <div className="flex flex-row gap-x-2">
                                <p className="block text-m font-medium">
                                    Current Status: <span>Test</span>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="px-5 pt-5 justify-center items-center">
                <CardContent>
                    {/* Probably need live count i think */}
                    <div className="mb-4 flex flex-row gap-x-2">
                        <p className="mb-2 block text-m font-medium">
                            Current Passengers: <span>Test</span>
                        </p>
                        </div>

                        <div className="mb-4 flex flex-row gap-x-2">
                        <p className="mb-2 block text-m font-medium">
                            Discrepency: <span>Test</span>
                        </p>
                        </div>

                        <div className="mb-4 flex flex-row gap-x-2">
                        <p className="mb-2 block text-m font-medium">
                            Connected Sensor: <span>Test</span>
                        </p>
                        </div>

                        <div className="flex flex-row gap-x-2 justify-center items-center">
                        <Button>Refresh Now</Button>
                    </div>
                </CardContent>
            </Card>

            </div>

        <div className="flex flex-col">
            <Card className="w-[500px] h-[500px]">
                <CardContent>GOOGLE MAP</CardContent>
            </Card>
        </div>

    </div>
  )
}
