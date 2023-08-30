import {Reading, processReadingsPromise} from "../index"


describe("Testing processReadings", () => {
    const testData: Promise<Reading[]> = new Promise((resolve, reject) => {
        const simulatedReadings: Reading[] = [
            {
                sensorId: 1,
                timestamp: '2023-08-20T12:52:48.775Z',
                sensorType: "air",
                sensorValue: 5
            },
            {
                sensorId: 2,
                timestamp: '2023-08-20T12:52:46.442Z',
                sensorType: "humidity",
                sensorValue: 2
            },
            {
                sensorId: 1,
                timestamp: '2023-08-20T12:52:48.775Z',
                sensorType: "temperature",
                sensorValue: 5
            }
        ];
        resolve(simulatedReadings);
    });

    test("should return 2 readings", async () => {
        const result = await processReadingsPromise(1, testData)
        if(result){
            expect(result.length).toBe(2)
            expect(result).not.toBe(null)
        }
    })
    test("should return 1 readings", async () => {
        const result = await processReadingsPromise(2, testData)
        if(result){
            expect(result.length).toBe(1)
            expect(result).not.toBe(null)
        }
    })
    test("should return 1 readings", async () => {
        const result = await processReadingsPromise(3, testData)
        if(result){
            expect(result.length).toBe(0)
        }
    })
})