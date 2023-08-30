
export interface Reading {
    sensorId:number,
    timestamp: string,
    sensorType: "air" | "humidity" | "temperature",
    sensorValue: number
}

export function filterObjectsBySensorID (sensorID: number, readings: Reading[]) {
    const filteredList = readings.filter(reading => reading.sensorId === sensorID);
    return filteredList;
}

export async function processReadingsPromise(sensorID: number, readingsPromise: Promise<Reading[]>) {
    try {
        const readings = await readingsPromise;
        const filteredList = readings.filter(reading => reading.sensorId === sensorID);
        return filteredList;
    } catch (error) {
        console.error('Error:', error);
    }
}

export function getLatestReadingByTimestamp(readings:Reading[]): Reading[] {
    const latestReadingsMap = new Map();
    readings.forEach((reading) => {
        const existingReading = latestReadingsMap.get(reading.sensorId);
        if (!existingReading || reading.timestamp > existingReading.timestamp) {
            latestReadingsMap.set(reading.sensorId, reading);
        }
    });
    const latestReadingSortedByTimestamp:Reading[] = Array.from(latestReadingsMap.values());
    const latestReading = latestReadingSortedByTimestamp.reduce((acc:any, {sensorId}) => {
        acc[sensorId] = `latest reading with id ${sensorId}`;
        return acc;
    }, {});
    return latestReading
}

const getMockReadings = async ():Promise<any[]> => {
    await new Promise(res => setTimeout(res, 500));
    return [
        {
            id: 1,
            sensorType: 'air',
            sensorValue: 14,
            timestamp: '2023-08-20T12:52:48.775Z'
        },
        {
            id: 2,
            sensorType: 'humidity',
            sensorValue: 0.8,
            timestamp: '2023-08-22T12:52:48.775Z'
        },
        {
            id: 3,
            sensorType: 'temperature', sensorValue: 21,
            timestamp: '2023-08-23T12:52:48.775Z'
        }
    ]
}

function checkAirQuality(reading: any) {
    return reading.sensorType == 'air' && reading.sensorValue > 12;
}

function checkHumidityQuality(reading: any){
    return reading.sensorType == 'humidity' && reading.sensorValue > 1
}

function checkTemperature(reading:any){
    return reading.sensorType == 'temperature' && reading.sensorValue > 25
}

async function checkUpperThresholds() {
    const allSensorReadings = await getMockReadings()
    if(allSensorReadings){
        allSensorReadings.forEach((reading) => {
            if (checkAirQuality(reading)) console.error("Air value has exceeded threshold");
            if (checkHumidityQuality(reading)) console.error("Humidity value has excceded threshold");
            if (checkTemperature(reading)) console.error("Humidity value has excceded threshold");;
        })
    }
}