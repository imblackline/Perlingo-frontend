<template>
    <div class="homeCard__container">
        <button
            class="homeCard__addbutton"
            :class="{ 'homeCard__addbutton--showInput': showSearchBar }"
            @click="showSearchBar = true"
            v-click-outside="hideSearchBar"
        >
            <span
                class="material-icons-round homeCard__addbutton__pasteIcon"
                @click.stop="pasteClipboard"
            >
                content_paste
            </span>
            <input
                type="text"
                class="homeCard__addbutton__input"
                placeholder="New word OR Google translate link"
                @click.stop
                v-model="newLinkWord"
            />
            <p
                class="homeCard__addbutton__icon"
                @click="showSearchBar ? addNewCar() : undefined"
            >
                +
            </p>
        </button>
        <div class="homeCard__tabs">
            <div
                class="homeCard__tabs__tab"
                :class="{
                    'homeCard__tabs__tab--active': $route.name !== 'cardlist',
                }"
                @click="showRandomCard"
            >
                Practice Card
                <span class="homeCard__tabs__tab__count"
                    >({{ needPracticeCards.length }})</span
                >
            </div>
            <div
                class="homeCard__tabs__tab"
                :class="{
                    'homeCard__tabs__tab--active': $route.name === 'cardlist',
                }"
                @click="gotoAllCards"
            >
                All Cards
                <span class="homeCard__tabs__tab__count"
                    >({{ $store.state.Allcards.length }})</span
                >
            </div>
        </div>
        <router-view @getAllCards="getAllCards"></router-view>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import {
    computed,
    nextTick,
    onBeforeMount,
    onMounted,
} from "@vue/runtime-core";
export default {
    name: "SmartHomeCard",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const newLinkWord = ref();
        const showSearchBar = ref(false);
        const selectedTab = ref("practice");
        onBeforeMount(() => {
            if (route.fullPath === "/") {
                router.push("/cardlist");
                nextTick(() => {
                    router.push("/cardlist");
                });
            }
        });
        const getAllCards = async () => {
            await axios
                .get(`${store.state.BASE_URL}/cards`, {
                    headers: {
                        Authorization: `Bearer ${store.state.me.token}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    store.commit("SAVE_ALLCARDS", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        onMounted(() => {
            getAllCards();
        });
        const needPracticeCards = computed(() =>
            store.state.Allcards.filter(
                (card) => card.status === "need Practice",
            ),
        );
        const showRandomCard = () => {
            if (needPracticeCards.value.length > 0) {
                router.push(
                    `/${
                        needPracticeCards.value[
                            Math.floor(
                                Math.random() * needPracticeCards.value.length,
                            )
                        ]._id
                    }`,
                );
            } else {
                router.push("/nocard");
            }
            selectedTab.value = "practice";
        };
        const gotoAllCards = () => {
            router.push("/cardlist");
            selectedTab.value = "all";
        };
        const hideSearchBar = () => {
            showSearchBar.value = false;
        };

        async function pasteClipboard() {
            const text = await navigator.clipboard.readText();
            newLinkWord.value = text;
        }
        const addNewCar = () => {
            if (newLinkWord.value) {
                let newWord = undefined;
                if (
                    newLinkWord.value.includes("https://translate.google.com/")
                ) {
                    newWord = newLinkWord.value
                        .split("&text=")[1]
                        .split("&")[0];
                } else {
                    newWord = newLinkWord.value;
                }
                console.log("new word", newWord);
                axios
                    .post(`${store.state.BASE_URL}/cards`, {
                        text: newWord,
                        difficulty: "easy",
                    })
                    .then((res) => {
                        getAllCards();
                        newLinkWord.value = undefined;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // console.log("newcar", newLinkWord);
            }
        };
        return {
            selectedTab,
            showRandomCard,
            gotoAllCards,
            showSearchBar,
            hideSearchBar,
            newLinkWord,
            pasteClipboard,
            needPracticeCards,
            addNewCar,
            getAllCards,
        };
    },
};
</script>

<style scoped lang="scss">
.homeCard__container {
    width: 70%;
    height: 100%;

    @media (max-width: 700px) {
        width: 75%;
    }
    @media (max-width: 550px) {
        width: 85%;
    }
    @media (max-width: 450px) {
        width: 90%;
    }

    .homeCard__addbutton {
        width: 100%;
        border-radius: 15px;
        background-color: #88a47c;
        padding: 25px 13px;
        font-size: 3rem;
        margin-top: 20px;
        cursor: pointer;
        transition: padding 0.3s 0.5s;
        user-select: none;
        color: #2e4f4f;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;

        // position: relative;

        &:hover {
            font-size: 3.5rem;
        }
        &__pasteIcon {
            visibility: hidden;
            opacity: 0;
            transition: 0.3s;
            margin-right: 5px;
            font-weight: bold;
        }
        &__input {
            width: 0px;
            padding: 0;
            transition: 0.3s;
        }
        &__icon {
            transition: 1s;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            height: fit-content;
        }
        &--showInput {
            padding: 20px 13px;
            .homeCard__addbutton__input {
                width: 85%;
                border-radius: 7px;
                padding: 5px 10px;
                font-size: 1.3rem;
                background-color: #bfd7b5;
            }
            .homeCard__addbutton__icon {
                right: 8px;
                left: auto;
                top: 0;
                bottom: 0;
                padding: 0 6px;
            }
            .homeCard__addbutton__pasteIcon {
                opacity: 1;
                visibility: visible;
            }
            @media (max-width: 650px) {
                .homeCard__addbutton__input {
                    width: 80%;
                }
            }
            @media (max-width: 450px) {
                .homeCard__addbutton__input {
                    width: 75%;
                }
            }
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
            @media (max-width: 500px) {
                font-size: 1.1rem;
            }
            &:hover {
                opacity: 0.7;
            }
            &:first-of-type {
                margin-right: 20px;
            }
            &__count {
                font-size: 1.2rem;
                color: #2e4f4f;
                font-weight: bold;
                display: none;
                transition: 0.3s;
            }
            &--active {
                flex-grow: 1;
                opacity: 1;
                .homeCard__tabs__tab__count {
                    display: inline-block;
                    margin-left: 2px;
                }
                &:hover {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
