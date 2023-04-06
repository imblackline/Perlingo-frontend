<template>
    <div class="homeCard__container">
        <button class="homeCard__addbutton">+</button>
        <div class="homeCard__tabs">
            <div
                class="homeCard__tabs__tab"
                :class="{
                    'homeCard__tabs__tab--active': selectedTab === 'practice',
                }"
                @click="selectedTab = 'practice'"
            >
                Practice Card
            </div>
            <div
                class="homeCard__tabs__tab"
                :class="{
                    'homeCard__tabs__tab--active': selectedTab === 'all',
                }"
                @click="selectedTab = 'all'"
            >
                All Cards
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
    name: "SmartHomeCard",
    setup() {
        const selectedTab = ref("practice");

        return { selectedTab };
    },
};
</script>

<style scoped lang="scss">
.homeCard__container {
    width: 80%;
    height: 100%;
    // background-color: lightslategrey;
    .homeCard__addbutton {
        width: 100%;
        border-radius: 15px;
        background-color: #88a47c;
        padding: 0;
        font-size: 3rem;
        margin-top: 20px;
        cursor: pointer;
        transition: 0.3s;
        user-select: none;
        color: #2E4F4F;
        &:hover {
            font-size: 3.5rem;
        }
    }
    .homeCard__tabs {
        width: 100%;
        justify-content: space-between;
        display: flex;
        margin-top: 20px;
        &__tab {
            background-color: #227c70;
            font-size: 1.5rem;
            color: #e6e2c3;
            padding: 5px 20px;
            border-radius: 12px;
            opacity: 0.5;
            cursor: pointer;
            transition: 0.3s;
            user-select: none;
            &:hover {
                opacity: 0.7;
            }
            &:first-of-type {
                margin-right: 20px;
            }
            &--active {
                flex-grow: 1;
                opacity: 1;
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
