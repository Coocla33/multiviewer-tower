<script setup lang="ts">
    interface Props {
        driver: {
            racingNumber: string;
            abbreviation: string;
            team: {
                name: string;
                logoFile: string;
            };
            position: [number, number];
            trackPosition: number;
            interval: string;
            stopped: boolean;
        };
    }

    defineProps<Props>();
</script>

<template>
    <!-- <div v-if="driver.abbreviation == 'VER'">{{ driver }}</div> -->
    <div class="driver" :class="driver.stopped ? 'stopped' : ''">
        <div class="race-position-container">
            <div class="up-arrow" style="opacity: 0"></div>
            <div class="race-position">{{ driver.trackPosition }}</div>
            <div class="down-arrow" style="opacity: 0"></div>
        </div>
        <div class="divider"></div>
        <div class="team-badge">
            <img :src="driver.team.logoFile" />
        </div>
        <div class="abbreviation">{{ driver.abbreviation }}</div>
        <div
            v-if="!driver.stopped"
            class="value"
            :data-content="
                driver.interval.split(' ')[0] == 'LAP'
                    ? 'LEADER'
                    : driver.interval
            "
        >
            {{
                driver.interval.split(" ")[0] == "LAP"
                    ? "LEADER"
                    : driver.interval
            }}
        </div>
        <div v-else class="value" data-content="OUT">OUT</div>
        <div class="tyre s">S</div>
    </div>
</template>

<style scoped lang="scss">
    .driver {
        color: white;

        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;

        transition: opacity 0.5s ease-in-out;

        &.stopped {
            opacity: 0.5;
        }

        div {
            float: left;
        }

        .race-position-container {
            width: 14%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            $triangle-size: 5px;

            .up-arrow {
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 $triangle-size $triangle-size $triangle-size;
                border-color: transparent transparent #00d107;
                transform: translateY(4px) translateX(1px);
            }

            .down-arrow {
                width: 0;
                height: 0;
                border-style: solid;
                border-width: $triangle-size $triangle-size 0 $triangle-size;
                border-color: #ce1818 transparent transparent;
                transform: translateY(-3px) translateX(1px);
            }

            .race-position {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                font-family: "F1-REGULAR";
                font-style: italic;
                font-size: 15px;
                color: rgba(150, 150, 150);
            }
        }

        .divider {
            width: 1px;
            background: rgba(255, 255, 255, 0.1);
            height: 100%;
        }

        .team-badge {
            height: 25px;
            position: relative;
            width: 17%;

            display: flex;
            align-items: center;
            justify-content: center;

            img {
                height: 100%;
            }
        }

        .abbreviation {
            font-family: "F1-BOLD";
            font-size: 18px;
            width: 22%;
            text-align: left;
        }

        .value {
            width: 33%;
            text-align: center;
            font-family: "F1-REGULAR";
            font-size: 16.5px;

            &[data-content="LEADER"],
            &[data-content="OUT"],
            &[data-content="INTERVAL"] {
                font-style: italic;
                font-size: 15px;
            }
        }

        .tyre {
            width: 10%;
            text-align: center;
            font-family: "F1-REGULAR";
            font-size: 14px;

            &.s {
                color: #dc0000;
            }

            &.m {
                color: #fee900;
            }

            &.h {
                color: #fdfdfd;
            }
        }
    }
</style>
