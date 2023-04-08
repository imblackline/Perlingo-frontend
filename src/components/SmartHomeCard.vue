<template>
    <div class="homeCard__container">
        <button class="homeCard__addbutton">+</button>
        <div class="homeCard__tabs">
            <div
                class="homeCard__tabs__tab"
                :class="{
                    'homeCard__tabs__tab--active': $route.name !== 'cardlist',
                }"
                @click="showRandomCard"
            >
                Practice Card
            </div>
            <div
                class="homeCard__tabs__tab"
                :class="{
                    'homeCard__tabs__tab--active': $route.name === 'cardlist',
                }"
                @click="gotoAllCards"
            >
                All Cards
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { nextTick, onBeforeMount, onMounted } from "@vue/runtime-core";
export default {
    name: "SmartHomeCard",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const selectedTab = ref("practice");
        onBeforeMount(() => {
            if (route.fullPath === "/") {
                router.push("/cardlist");
                nextTick(() => {
                    router.push("/cardlist");
                });
            }
        });
        onMounted(() => {
            axios
                .get(`${store.state.BASE_URL}/cards`)
                .then((res) => {
                    console.log(res);
                    store.commit("UPDATE_ALLCARDS", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        const showRandomCard = () => {
            router.push("/12314");
            selectedTab.value = "practice";
        };
        const gotoAllCards = () => {
            router.push("/cardlist");
            selectedTab.value = "all";
        };
        return { selectedTab, showRandomCard, gotoAllCards };
    },
};
</script>

<style scoped lang="scss">
.homeCard__container {
    width: 70%;
    height: 100%;
    padding-bottom: 105px;
    overflow-x: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none;
    }

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
        color: #2e4f4f;
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
