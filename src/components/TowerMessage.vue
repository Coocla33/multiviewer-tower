<script setup lang="ts">
    import { useState } from "@/composables/useState";
    import { onMounted, ref, watch } from "vue";
    import gsap from "gsap";

    const { useMetadata } = useState();
    const metadata = useMetadata();

    const stateClass = ref("state-1");

    const message = ref({
        main: "",
        additional: "",
    });

    const onStatusUpdate = (o: string, n: string) => {
        console.log("TrackStatus Updated!", o, n);

        const hide = (type: "main" | "additional", cb?: () => void) => {
            const el = `.tower-message-container .${type}.message`;

            gsap.to(el, {
                height: 0,
                duration: 1,
                ease: "expo.inOut",
                onComplete: () => {
                    if (cb) cb();
                },
            });

            gsap.to(el + " .text", {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                duration: 1,
                ease: "expo.inOut",
            });
        };

        const show = (
            msg: string,
            type: "main" | "additional",
            h: number = 80,
            cb?: () => void
        ) => {
            const el = `.tower-message-container .${type}.message`;

            console.log("show", h);

            message.value[type] = msg;

            gsap.to(el, {
                height: h,
                duration: 1,
                ease: "expo.inOut",
                onComplete: () => {
                    if (cb) cb();
                },
            });

            gsap.to(el + " .text", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
                duration: 1,
                ease: "expo.inOut",
            });
        };

        const states = {
            "1": [
                {
                    type: "main",
                    action: "hide",
                },
                {
                    type: "additional",
                    action: "hide",
                },
            ],
            "2": [
                {
                    type: "main",
                    h: 80,
                    message: "YELLOW FLAG",
                    ignoreHide: ["6"],
                    action: "show",
                },
                {
                    type: "additional",
                    action: "hide",
                },
            ],
            "6": [
                {
                    type: "main",
                    h: 80,
                    message: "YELLOW FLAG",
                    ignoreHide: ["2"],
                    action: "show",
                },
                {
                    type: "additional",
                    h: 30,
                    message: "VIRTUAL SAFETY CAR",
                    ignoreHide: [],
                    action: "show",
                },
            ],
            "7": [
                {
                    type: "main",
                    action: "hide",
                },
                {
                    type: "additional",
                    h: 30,
                    message: "VSC ENDING",
                    ignoreHide: [],
                    action: "show",
                },
            ],
        };

        // @ts-ignore
        const actions = states[n];

        for (let action of actions) {
            if (action.action == "show") {
                if (action.ignoreHide.indexOf(o) > -1) {
                    stateClass.value = "state-" + n;
                    show(action.message, action.type, action.h);
                } else {
                    hide(action.type, () => {
                        stateClass.value = "state-" + n;
                        show(action.message, action.type, action.h);
                    });
                }
            } else if (action.action == "hide") {
                hide(action.type);
            }
        }
    };

    onMounted(() => {
        // Run on load as well
        onStatusUpdate("1", metadata.value.liveTimingState.TrackStatus.Status);
        watch(
            () => metadata.value.liveTimingState.TrackStatus.Status,
            (n, o) => {
                onStatusUpdate(o, n);
            }
        );
    });
</script>

<template>
    <div class="tower-message-container" :class="stateClass">
        <!-- {{ stateClass }} -->
        <div class="main message">
            <div class="text">{{ message.main }}</div>
        </div>
        <div class="additional message">
            <div class="text">{{ message.additional }}</div>
        </div>
    </div>
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

    .tower-message-container {
        .message {
            overflow: hidden;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "F1-BOLD";
            font-style: italic;
        }

        &.state-7 {
            .message.additional {
                background: #e0b808;
                color: #000000;

                .text {
                    transform: translateX(-3px) translateY(1px);
                }
            }
        }

        &.state-2,
        &.state-6 {
            .message {
                background: #e0b808;
                color: #000000;

                .text {
                    transform: translateX(-7px);
                }
                &.main {
                    .text {
                        font-size: 28px;
                    }
                }
            }
        }
    }
</style>
