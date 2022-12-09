<script setup lang="ts">
    import TowerMessage from "@/components/TowerMessage.vue";
    import TowerDriver from "@/components/TowerDriver.vue";
    import { useState } from "@/composables/useState";

    const { useMetadata, useTelemetry } = useState();

    const metadata = useMetadata();
    const telemetry = useTelemetry();
</script>

<template>
    <div
        class="leaderboard"
        v-if="metadata.liveTimingState && telemetry.drivers"
    >
        <div
            class="border"
            :class="'status-' + metadata.liveTimingState.TrackStatus.Status"
        >
            <div class="fill"></div>
            <div class="line"></div>
        </div>
        <div class="content-wrapper">
            <div
                class="border"
                :class="'status-' + metadata.liveTimingState.TrackStatus.Status"
            ></div>
            <div class="fade"></div>

            <div class="content">
                <div class="header">
                    <div class="logo">
                        <img src="../assets/img/f1-logo-white.svg" />
                    </div>
                    <div class="label">RACE</div>
                </div>
                <div class="laps">
                    <div class="text-wrapper">
                        <div class="label">LAP</div>
                        <div class="current">
                            {{ metadata.liveTimingState.LapCount.CurrentLap }}
                        </div>
                        <div class="divider">/</div>
                        <div class="total">
                            {{ metadata.liveTimingState.LapCount.TotalLaps }}
                        </div>
                    </div>
                </div>
                <div class="message">
                    <TowerMessage />
                </div>
                <div class="drivers">
                    <TowerDriver
                        v-for="driver in telemetry.drivers"
                        :key="driver.racingNumber"
                        :driver="driver"
                    />
                </div>
            </div>
        </div>
    </div>

    <div v-else>Loading!</div>
</template>

<style lang="scss">
    @font-face {
        font-family: "F1-BOLD";
        src: url("../assets/fonts/F1-BOLD.ttf");
    }

    @font-face {
        font-family: "F1-REGULAR";
        src: url("../assets/fonts/F1-REGULAR.ttf");
    }

    .leaderboard {
        $fade-duration: 1s;

        width: 265px;
        height: 1003px;

        position: relative;

        font-family: "F1-REGULAR";

        .border {
            width: 100%;
            height: 100%;
            position: absolute;

            &.status-2 {
                .grey {
                    $border-radius: 30px;

                    border-top: 10px solid rgba(224, 184, 8, 0.7);
                    border-left: 10px solid rgba(224, 184, 8, 0.7);
                    border-bottom: 10px solid rgba(224, 184, 8, 0.7);
                    border-top-left-radius: $border-radius;
                    border-bottom-left-radius: $border-radius;
                }

                .white {
                    $border-radius: 26px;

                    border-top: 2px solid rgba(224, 184, 8, 1);
                    border-left: 2px solid rgba(224, 184, 8, 1);
                    border-bottom: 2px solid rgba(224, 184, 8, 1);
                    border-top-left-radius: $border-radius;
                    border-bottom-left-radius: $border-radius;
                }
            }

            div {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left: 0;
            }

            .fill {
                @include border-outside-fill(rgba(100, 100, 100, 0.2));
                transition: border $fade-duration ease-in-out;
            }

            .line {
                @include border-outside-line(rgba(255, 255, 255, 0.2));
                transition: border $fade-duration ease-in-out;
            }

            &.red {
                .fill {
                    @include border-outside-fill(rgba(201, 24, 24, 0.7));
                }
                .line {
                    @include border-outside-line(rgba(201, 24, 24, 1));
                }
            }

            &.status-2 {
                .fill {
                    @include border-outside-fill(rgba(224, 184, 8, 0.7));
                }
                .line {
                    @include border-outside-line(rgba(224, 184, 8, 1));
                }
            }

            &.green {
                .fill {
                    @include border-outside-fill(rgba(0, 209, 7, 0.7));
                }
                .line {
                    @include border-outside-line(rgba(0, 209, 7, 1));
                }
            }
        }

        .content-wrapper {
            overflow: hidden;

            $offset: 10px;
            $border-radius: 20px;
            $background-color: rgba(10, 10, 10, 0.75);

            width: calc(100% - $offset);
            height: calc(100% - $offset * 2);

            position: absolute;
            left: $offset;
            top: $offset;

            box-sizing: border-box;

            border-top-left-radius: $border-radius;
            border-bottom-left-radius: $border-radius;

            background: $background-color;

            .fade {
                position: absolute;
                width: 30%;
                height: 230%;
                left: 100%;
                top: 50%;
                transform: translateX(-100%) translateY(-50%);

                background: radial-gradient(
                    farthest-corner at 150% 50%,
                    rgba(100, 100, 100, 0.8) -0%,
                    rgba(0, 0, 0, 0) 50%
                );
            }

            .border {
                $offset: 6px;

                transition: border $fade-duration ease-in-out;

                box-sizing: border-box;

                width: calc(100% - $offset);
                height: calc(100% - $offset * 2 - 1px);
                top: $offset + 1px;
                left: $offset;

                @include border-inside-line(rgba(255, 255, 255, 0.2));

                &.red {
                    @include border-inside-line(rgba(201, 24, 24, 1));
                }

                &.status-2 {
                    @include border-inside-line(rgba(224, 184, 8, 1));
                }

                &.green {
                    @include border-inside-line(rgba(0, 209, 7, 1));
                }
            }

            .content {
                $offset: 9px;

                position: absolute;
                top: $offset;
                left: $offset - 1px;

                width: 100%;
                height: calc(100% - $offset * 2);

                display: flex;
                flex-direction: column;

                .header {
                    width: 100%;
                    // height: 52px;
                    flex: 0 1 52px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    .logo {
                        height: 32px;
                        margin-left: 6px;

                        img {
                            height: 100%;
                        }
                    }

                    .label {
                        font-family: "F1-BOLD";
                        font-weight: bold;
                        color: #babebd;
                        font-size: 31px;
                        margin-left: 4px;
                        margin-bottom: 4px;
                        align-self: flex-end;
                    }
                }

                .laps {
                    width: 100%;
                    // height: 35px;
                    flex: 0 1 35px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .text-wrapper {
                        width: 132px;
                        display: flex;
                        align-items: center;

                        div {
                            display: inline-block;
                            color: white;
                            font-style: italic;
                        }

                        .label,
                        .divider,
                        .total {
                            font-family: "F1-REGULAR";
                        }

                        .current {
                            font-family: "F1-BOLD";
                            font-variant-numeric: tabular-nums;
                        }

                        .label {
                            font-size: 18px;
                        }

                        .current {
                            transform: translateY(2px);
                            font-size: 24px;
                            margin-left: 10px;
                        }

                        .divider {
                            margin-left: 4px;
                            font-size: 17px;
                        }

                        .total {
                            margin-left: 2px;
                            font-size: 18px;
                            font-variant-numeric: tabular-nums;
                        }
                    }
                }

                .message {
                    flex: 0 1 auto;
                }

                .drivers {
                    display: inline-block;
                    width: 100%;
                    flex: 1 1 auto;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .driver-container {
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
