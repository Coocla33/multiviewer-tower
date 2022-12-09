<script setup lang="ts">
    import gsap from "gsap";
    import { useState } from "@/composables/useState";
    import { onMounted, ref, watch } from "vue";

    const { useMetadata } = useState();

    const metadata = useMetadata();

    const messages: any = {
        "1": "",
        "2": "YELLOW FLAG",
        "3": "RED FLAG",
        "4": "SAFETY CAR",
        "6": "VIRTUAL SAFETY CAR",
    };
    const message = ref(
        messages[metadata.value.liveTimingState.TrackStatus.Status]
    );
    const stateClass = ref("state-1");

    onMounted(() => {
        update();
        watch(
            () => metadata.value.liveTimingState.TrackStatus.Status,
            () => {
                update();
            }
        );
    });

    const update = () => {
        const status = metadata.value.liveTimingState.TrackStatus.Status;

        // Update Message
        const updateMessage = () => {
            message.value = messages[status];
        };

        const updateStateClass = () => {
            stateClass.value = "state-" + status;
        };

        // Animate depending on status
        switch (status) {
            case "1":
                gsap.to(".message.animate", {
                    height: 0,
                    duration: 1,
                    ease: "expo.inOut",
                });

                gsap.to(".message.animate .text", {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    duration: 1,
                    ease: "expo.inOut",
                    onComplete: () => {
                        updateStateClass();
                        updateMessage();
                    },
                });
                break;
            default:
                updateMessage();
                updateStateClass();

                let h = 80;

                gsap.to(".message.animate", {
                    height: h,
                    duration: 1,
                    ease: "expo.inOut",
                });

                gsap.to(".message.animate .text", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
                    duration: 1,
                    ease: "expo.inOut",
                });
        }
    };
</script>

<template>
    <div class="message animate" :class="stateClass">
        <div class="text">{{ message }}</div>
    </div>
</template>

<style scoped lang="scss">
    @font-face {
        font-family: "F1-BOLD";
        src: url("../assets/fonts/F1-BOLD.ttf");
    }

    .message {
        overflow: hidden;
        color: white;

        display: flex;
        justify-content: center;
        align-items: center;

        .text {
            font-family: "F1-BOLD";
            font-style: italic;
        }

        &.state-3 {
            background: #ce1818;

            .text {
                font-size: 38px;
                transform: translateX(-7px);
            }
        }

        &.state-2 {
            background: #e0b808;
            color: #000000;

            .text {
                font-size: 28px;
                transform: translateX(-7px);
            }
        }

        &.state-6 {
            background: #e0b808;
            color: #000000;

            .text {
                font-size: 28px;
                text-align: center;
                transform: translateX(-7px);
            }
        }

        // &.state-1 {
        //     background: #00d107;
        //     color: #000000;

        //     .text {
        //         font-size: 30px;
        //         transform: translateX(-7px);
        //     }
        // }
    }
</style>
