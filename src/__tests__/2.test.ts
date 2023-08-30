import {Reading,getLatestReadingByTimestamp} from "../index"


describe("Testing  gets the latest reading", () => {
    const testData: Reading[] = [
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
    ]

    const expectedObject = {
        '1': 'latest reading with id 1', '2': 'latest reading with id 2'
    }

    test("should return latest reading", () => {
        const result = getLatestReadingByTimestamp(testData)
        expect(result).toMatchObject(expectedObject)
    })
})