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
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>
