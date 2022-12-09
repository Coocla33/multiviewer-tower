import { ref } from "vue";
import { request, gql } from "graphql-request";

const telemetry: any = ref({});
const metadata: any = ref({});

let interval: number | undefined;

const tps = 2; // Ticks Per Seconds

export const useState = () => {
    const start = () => {
        if (interval != undefined) return;

        tick();
        interval = setInterval(tick, 1000 / tps);
    };

    const tick = async () => {
        // Update Metadata
        const metadataData = await request(
            "http://localhost:10101/api/graphql",
            gql`
                query {
                    liveTimingState {
                        LapCount
                        TrackStatus
                        TimingAppData
                    }
                }
            `
        );

        metadata.value = metadataData;

        // Update Telemetry
        const telemetryData = await request(
            "http://localhost:10101/api/graphql",
            gql`
                query {
                    liveTimingState {
                        DriverList
                        Position
                        TimingData
                    }
                }
            `
        );

        const parsedTelemetry: { drivers: any[] } = {
            drivers: [],
        };

        // Loop over telemetryData
        for (
            let i = 0;
            i < Object.keys(telemetryData.liveTimingState.DriverList).length;
            i++
        ) {
            const key = Object.keys(telemetryData.liveTimingState.DriverList)[
                i
            ];
            const driver = telemetryData.liveTimingState.DriverList[key];
            const position =
                telemetryData.liveTimingState.Position.Position.reverse()[0]
                    .Entries;
            const timing = telemetryData.liveTimingState.TimingData.Lines[key];

            parsedTelemetry.drivers.push({
                racingNumber: driver.RacingNumber,
                abbreviation: driver.Tla,
                team: {
                    name: driver.TeamName,
                    logoFile: require("../assets/img/teams/" +
                        driver.TeamName.toLowerCase().split(" ").join("_") +
                        ".png"),
                },
                position: [
                    position[driver.RacingNumber].X,
                    position[driver.RacingNumber].Y,
                ],
                trackPosition: driver.Line,
                interval: timing.IntervalToPositionAhead.Value,
                stopped: timing.Stopped,
            });
        }

        // Sort
        parsedTelemetry.drivers.sort(
            (a, b) => a.trackPosition - b.trackPosition
        );

        telemetry.value = parsedTelemetry;
    };

    const stop = () => {
        clearInterval(interval);
    };

    const useTelemetry = () => {
        start();

        return telemetry;
    };

    const useMetadata = () => {
        start();

        return metadata;
    };

    return {
        useTelemetry,
        useMetadata,
    };
};
