<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; display: block"
        width="121px"
        height="121px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
    >
        <circle cx="25" cy="50" fill="#e6e2c3" r="25">
            <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.78125s"
                keyTimes="0;0.5;1"
                values="25;75;25"
                begin="-0.390625s"
            ></animate>
        </circle>
        <circle cx="75" cy="50" fill="#88a47c" r="25">
            <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.78125s"
                keyTimes="0;0.5;1"
                values="25;75;25"
                begin="0s"
            ></animate>
        </circle>
        <circle cx="25" cy="50" fill="#e6e2c3" r="25">
            <animate
                attributeName="cx"
                repeatCount="indefinite"
                dur="0.78125s"
                keyTimes="0;0.5;1"
                values="25;75;25"
                begin="-0.390625s"
            ></animate>
            <animate
                attributeName="fill-opacity"
                values="0;0;1;1"
                calcMode="discrete"
                keyTimes="0;0.499;0.5;1"
                dur="0.78125s"
                repeatCount="indefinite"
            ></animate>
        </circle>
    </svg>
</template>
