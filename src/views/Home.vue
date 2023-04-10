<template>
    <div class="home-container">
        <SmartHomeCard />
    </div>
</template>

<script>
import SmartHomeCard from "@/components/SmartHomeCard.vue";

export default {
    name: "Home",
    components: {
        SmartHomeCard,
    },
};
</script>
<style>
.home-container {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.home-container::-webkit-scrollbar {
    display: none;
}
</style>
