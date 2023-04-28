<template>
    <div class="container">
        <div class="card" >
            <div class="card__topicon">
                <div class="card__topicon__row" v-show="!showDifficultySelect">
                    <span
                        class="material-icons card__topicon__row__icon"
                        @click.stop="removeCard"
                    >
                        delete
                    </span>
                    <div
                        class="card__topicon__row__difficulty"
                        :style="{
                            'background-color': difficultyColor(
                                showedCard?.difficulty,
                            ),
                        }"
                        @click.stop="showDifficultySelect = true"
                    >
                        {{ showedCard?.difficulty }}
                    </div>
                    <span class="material-icons card__topicon__row__icon">
                        edit
                    </span>
                </div>
                <div
                    class="card__topicon__row second__row"
                    :class="{ 'second__row--show': showDifficultySelect }"
                    v-click-outside="hideDifficultySelect"
                >
                    <div
                        class="card__topicon__row__difficulty"
                        :style="{
                            'background-color': difficultyColor('easy'),
                        }"
                        @click.stop="changeDifficulty('easy')"
                    >
                        easy
                    </div>
                    <div
                        class="card__topicon__row__difficulty"
                        :style="{
                            'background-color': difficultyColor('tricky'),
                        }"
                        @click.stop="changeDifficulty('tricky')"
                    >
                        tricky
                    </div>
                    <div
                        class="card__topicon__row__difficulty"
                        :style="{
                            'background-color': difficultyColor('hard'),
                        }"
                        @click.stop="changeDifficulty('hard')"
                    >
                        hard
                    </div>
                    <div
                        class="card__topicon__row__difficulty"
                        :style="{
                            'background-color': difficultyColor('super'),
                        }"
                        @click.stop="changeDifficulty('super')"
                    >
                        super
                    </div>
                </div>
            </div>
            <div class="card__blur" @click.stop v-show="isLoadingPass">
                <SVGLoading class="card__blur__loading" />
            </div>
            <div class="card__text" v-if="currentRoute === '/nocard'">
                No cards left
            </div>
            <div class="card__text" v-else>
                {{
                    showedCard?.text
                        ? showedCard.text.charAt(0).toUpperCase() +
                          showedCard.text.slice(1)
                        : "Not Found!"
                }}
            </div>
            <div class="card__pronunciation">
                {{ showedCard?.phonetic ? showedCard?.phonetic : "N/A" }}
            </div>
            <div
                class="card__translation"
                :class="{ 'card__translation--show': showTranslation }"
                @click="showTranslation = !showTranslation"
            >
                {{ showedCard?.translation }}
            </div>
            <div class="card__buttons">
                <div
                    class="card__buttons__onebutton"
                    v-show="currentRoute === '/nocard'"
                    @click.stop="againAllCards"
                >
                    Practice All cards Again
                    <span
                        class="material-icons-round card__buttons__button__icon"
                    >
                        refresh
                    </span>
                </div>
                <div
                    class="card__buttons__button"
                    @click.stop="againCard"
                    v-show="currentRoute !== '/nocard'"
                >
                    Again
                    <span
                        class="material-icons-round card__buttons__button__icon"
                    >
                        refresh
                    </span>
                </div>
                <div
                    class="card__buttons__button"
                    @click.stop="passCard"
                    v-show="currentRoute !== '/nocard'"
                >
                    Pass
                    <span
                        class="material-icons-round card__buttons__button__icon"
                    >
                        done_all
                    </span>
                </div>
            </div>
            <SVGDrop
                class="card__drop"
                :class="{ 'card__drop--hide': showDetail }"
                @click.stop="showDetail = !showDetail"
                v-if="currentRoute !== '/nocard'"
            />
            <span
                class="material-icons-round card__dropicon"
                :class="{ 'card__dropicon--open': showDetail }"
                @click.stop="showDetail = !showDetail"
                v-if="currentRoute !== '/nocard'"
            >
                keyboard_arrow_down
            </span>
        </div>
        <div
            class="card__detail"
            :class="{ 'card__detail--show': showDetail }"
            v-if="showedCard?.meanings.length"
        >
            <div
                class="card__detail__meanings"
                v-for="meaning in showedCard?.meanings"
                :key="meaning"
            >
                <div class="card__detail__meanings__phonetic">
                    {{ meaning.partOfSpeech }}
                </div>
                <div
                    class="card__detail__meanings__definitions"
                    v-for="definition in meaning.definitions"
                    :key="definition"
                >
                    {{ definition.definition }}
                </div>
            </div>
        </div>
        <div
            class="card__detail"
            :class="{ 'card__detail--show': showDetail }"
            v-else
        >
            <b>Oops there is no detail</b>
        </div>
    </div>
</template>

<script>
import SVGDrop from "@/components/SVG/drop.vue";
import SVGLoading from "@/components/SVG/loading.vue";
import { ref } from "@vue/reactivity";
import { computed, nextTick, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import router from "../router";

export default {
    components: { SVGDrop, SVGLoading },
    emits: ["getAllCards"],
    setup(_, { emit }) {
        const route = useRoute();
        const store = useStore();

        const showTranslation = ref(false);
        const showDetail = ref(false);
        const showDifficultySelect = ref(false);
        const isLoadingPass = ref(false);
        const getCardById = (id) => {
            axios
                .get(`${store.state.BASE_URL}/cards/${id}`)
                .then((res) => {
                    // console.log(res);
                    return res;
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        const hideDifficultySelect = () => {
            showDifficultySelect.value = false;
        };
        const difficultyColor = (difficulty) => {
            if (difficulty === "easy") {
                return "#72bf44";
            } else if (difficulty === "tricky") {
                return "#f7a233";
            } else if (difficulty === "hard") {
                return "#d64242";
            } else if (difficulty === "super") {
                return "#ad4dff";
            }
        };
        const needPracticeCards = computed(() =>
            store.state.Allcards.filter(
                (card) => card.status === "need Practice",
            ),
        );
        const currentRoute = computed(() => route.path);

        onMounted(() => {
            if (
                currentRoute.value === "/nocard" &&
                needPracticeCards.value.length > 0
            ) {
                router.push(
                    `/${
                        needPracticeCards.value[
                            Math.floor(
                                Math.random() * needPracticeCards.value.length,
                            )
                        ]._id
                    }`,
                );
            }
        });
        const showedCard = computed(() => {
            if (
                store.state.Allcards &&
                store.state.Allcards.find(
                    (card) => card._id === route.params.cardId,
                )
            ) {
                return store.state.Allcards.find(
                    (card) => card._id === route.params.cardId,
                );
            } else {
                return getCardById(route.params.cardId);
            }
        });
        const passCard = () => {
            isLoadingPass.value = true;
            showTranslation.value = false;
            axios
                .patch(
                    `${store.state.BASE_URL}/cards/${showedCard.value._id}`,
                    [
                        {
                            propName: "status",
                            value: "readed",
                        },
                    ],
                )
                .then((res) => {
                    store.state.Allcards.find(
                        (card) => card._id === res.data._id,
                    ).status = "readed";
                    if (needPracticeCards.value.length > 0) {
                        router.push(
                            `/${
                                needPracticeCards.value[
                                    Math.floor(
                                        Math.random() *
                                            needPracticeCards.value.length,
                                    )
                                ]._id
                            }`,
                        );
                    } else {
                        router.push("/nocard");
                    }
                    isLoadingPass.value = false;
                })
                .catch((err) => {
                    isLoadingPass.value = false;
                    console.log(err);
                });
        };
        const againCard = () => {
            isLoadingPass.value = true;
            showTranslation.value = false;
            axios
                .patch(
                    `${store.state.BASE_URL}/cards/${showedCard.value._id}`,
                    [
                        {
                            propName: "status",
                            value: "need Practice",
                        },
                    ],
                )
                .then((res) => {
                    store.state.Allcards.find(
                        (card) => card._id === res.data._id,
                    ).status = "need Practice";
                    router.push(
                        `/${
                            needPracticeCards.value[
                                Math.floor(
                                    Math.random() *
                                        needPracticeCards.value.length,
                                )
                            ]._id
                        }`,
                    );
                    isLoadingPass.value = false;
                })
                .catch((err) => {
                    isLoadingPass.value = false;
                    console.log(err);
                });
        };
        const againAllCards = () => {
            isLoadingPass.value = true;
            axios
                .patch(`${store.state.BASE_URL}/cards/againAll`)
                .then((res) => {
                    showTranslation.value = false;
                    store.commit("UPDATE_ALLCARDS");
                    console.log(store.state.Allcards);
                    router.push(
                        `/${
                            needPracticeCards.value[
                                Math.floor(
                                    Math.random() *
                                        needPracticeCards.value.length,
                                )
                            ]._id
                        }`,
                    );
                    isLoadingPass.value = false;
                })
                .catch((err) => {
                    isLoadingPass.value = false;
                    console.log(err);
                });
        };
        const removeCard = () => {
            isLoadingPass.value = true;
            axios
                .delete(`${store.state.BASE_URL}/cards/${showedCard.value._id}`)
                .then((res) => {
                    showTranslation.value = false;
                    console.log(store.state.Allcards);
                    store.commit("DELETE_CARD", showedCard.value._id);
                    router.push(
                        `/${
                            needPracticeCards.value[
                                Math.floor(
                                    Math.random() *
                                        needPracticeCards.value.length,
                                )
                            ]._id
                        }`,
                    );
                    isLoadingPass.value = false;
                })
                .catch((err) => {
                    isLoadingPass.value = false;
                    console.log(err);
                });
        };
        const changeDifficulty = (newDifficulty) => {
            isLoadingPass.value = true;
            axios
                .patch(
                    `${store.state.BASE_URL}/cards/${showedCard.value._id}`,
                    [
                        {
                            propName: "difficulty",
                            value: newDifficulty,
                        },
                    ],
                )
                .then((res) => {
                    store.state.Allcards.find(
                        (card) => card._id === res.data._id,
                    ).difficulty = newDifficulty;
                    isLoadingPass.value = false;
                    showDifficultySelect.value = false;
                })
                .catch((err) => {
                    isLoadingPass.value = false;
                    showDifficultySelect.value = false;
                    console.log(err);
                });
        };
        return {
            showTranslation,
            showDetail,
            showedCard,
            passCard,
            isLoadingPass,
            againCard,
            currentRoute,
            againAllCards,
            removeCard,
            difficultyColor,
            showDifficultySelect,
            hideDifficultySelect,
            changeDifficulty
        };
    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    .card {
        width: 100%;
        aspect-ratio: 1/1;
        background-color: #227c70;
        margin-top: 20px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 21px 6px rgba(44, 51, 51, 0.25);
        position: relative;
        &__topicon {
            position: absolute;
            width: 90%;
            display: flex;
            flex-direction: column;
            top: 20px;
            align-items: center;
            &__row {
                // margin-bottom: 25px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &__difficulty {
                    height: fit-content;
                    padding: 1px 30px;
                    opacity: 0.7;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                }
                &__icon {
                    cursor: pointer;
                    font-size: 1.9rem;
                    color: #2e4f4f;
                    transition: 0.3s;
                    padding: 5px;
                    user-select: none;
                    border-radius: 50px;
                    &:hover {
                        background-color: #88a47c74;
                    }
                }
            }
            .second__row {
                margin-top: 10px;
                width: 0;
                transition: 0.3s;
                visibility: hidden;
                transform: translateX(-140px) translateY(10px);
                opacity: 0;
                margin-top: -40px;
                &--show {
                    margin-top: 0;
                    transform: none;
                    visibility: visible;
                    opacity: 1;
                    width: 100%;
                }
                .card__topicon__row__difficulty {
                    padding: 1px 20px;
                    transition: 0.3s;
                    &:hover {
                        padding: 1px 30px;
                    }
                }
            }
        }
        &__blur {
            position: absolute;
            width: 99%;
            height: 99%;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            // filter: blur(5px);
            backdrop-filter: blur(5px);
            z-index: 1;
            &__loading {
                z-index: 2;
            }
        }
        &__text {
            font-size: 2.5rem;
            color: white;
            font-weight: bold;
        }
        &__pronunciation {
            font-size: 1.3rem;
            margin-top: 15px;
        }
        &__translation {
            color: #e6e2c3;
            font-weight: bold;
            font-size: 2rem;
            cursor: pointer;
            margin-top: 30px;
            color: transparent;
            text-shadow: 0 0 19px #e6e2c3;
            transition: 0.3s;
            padding: 3px 15px;
            &--show {
                color: #e6e2c3;
                text-shadow: none;
            }
        }
        &__buttons {
            display: flex;
            align-items: center;
            width: 90%;
            position: absolute;
            bottom: 20px;
            justify-content: space-between;
            &__onebutton {
                background: #2e4f4f;
                box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.25);
                border-radius: 12px;
                color: #e6e2c3;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 15px;
                width: 100%;
                font-size: 1.3rem;
                transition: 0.3s;
                cursor: pointer;
                user-select: none;
                &:hover {
                    font-size: 1.4rem;
                }
            }
            &__button {
                background: #2e4f4f;
                box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.25);
                border-radius: 12px;
                color: #e6e2c3;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 50px;
                font-size: 1.3rem;
                transition: 0.3s;
                user-select: none;
                cursor: pointer;
                @media (max-width: 500px) {
                    padding: 7px 40px;
                    font-size: 1.1rem;
                }
                &__icon {
                    margin-left: 10px;
                }
                &:hover {
                    font-size: 1.7rem;
                }
            }
        }
        &__drop {
            position: absolute;
            // top: auto;
            // bottom: -68px;
            cursor: pointer;
            top: 98.5%;
            transition: 0.5s;
            width: 95%;
            @media (max-width: 600px) {
                top: 98%;
            }
            @media (max-width: 510px) {
                top: 97%;
            }
            @media (max-width: 430px) {
                top: 96%;
            }
            @media (max-width: 390px) {
                top: 95%;
            }
            @media (max-width: 360px) {
                top: 94%;
            }
            &--hide {
                height: 0;
            }
        }
        &__drop:hover + .card__dropicon {
            transform: translateY(5px);
        }
        &__dropicon {
            transition: 0.3s;
            position: absolute;
            bottom: -50px;
            font-size: 3rem;
            z-index: 1;
            cursor: pointer;
            user-select: none;
            @media (max-width: 430px) {
                bottom: -45px;
            }
            &:hover {
                transform: translateY(5px);
            }
            &--open {
                transform: rotate(180deg);
                background-color: #2e4f4f;
                border-radius: 50%;
                color: #e6e2c3;
                bottom: -35px;
                width: 60px;
                aspect-ratio: 1/1;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover {
                    width: 65px;
                    bottom: -37.5px;
                    transform: rotate(180deg);
                }
            }
        }
    }
    .card__detail {
        width: 100%;
        background-color: #227c70;
        border-radius: 20px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-height: 0;
        overflow: hidden;
        padding: 0;
        visibility: hidden;
        opacity: 0;
        transition: max-height 0.5s, padding 0.5s 0.3s, visibility 0.5s 0.3s,
            opacity 0.5s 0.3s;
        // transition: padding 0.5s 0.1s;

        &--show {
            padding: 15px;
            max-height: 1000px;
            visibility: visible;
            opacity: 1;
            transition: max-height 0.5s, padding 0.3s 0s;
        }
        &__meanings {
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            &__phonetic {
                background-color: #2e4f4f;
                user-select: none;
                padding: 1px 15px;
                font-size: 1rem;
                border-radius: 50px;
                color: #88a47c;
                margin-bottom: 10px;
            }
            &__definitions {
                text-align: left;
                border-bottom: 2px dashed #88a47c7b;
                padding-bottom: 10px;
                margin-bottom: 10px;
                width: 100%;
                font-size: 1.2rem;
                &:last-of-type {
                    border: none;
                }
            }
        }
    }
}
</style>
