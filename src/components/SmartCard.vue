<template>
    <div class="container">
        <div class="card" @click="showTranslation = !showTranslation">
            <div class="card__text">
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
            >
                {{ showedCard?.translation }}
            </div>
            <div class="card__buttons">
                <div class="card__buttons__button" @click.stop>
                    Again
                    <span
                        class="material-icons-round card__buttons__button__icon"
                    >
                        refresh
                    </span>
                </div>
                <div class="card__buttons__button" @click.stop="passCard">
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
            />
            <span
                class="material-icons-round card__dropicon"
                :class="{ 'card__dropicon--open': showDetail }"
                @click.stop="showDetail = !showDetail"
            >
                keyboard_arrow_down
            </span>
        </div>
        <div
            class="card__detail"
            :class="{ 'card__detail--show': showDetail }"
            v-if="showedCard.meanings.length"
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
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default {
    components: { SVGDrop },
    setup() {
        const route = useRoute();
        const store = useStore();

        const showTranslation = ref(false);
        const showDetail = ref(false);
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
            axios
                .patch(`${store.state.BASE_URL}/cards/${showedCard.value._id}`, [
                    {
                        propName: "status",
                        value: "readed",
                    },
                ])
                .then((res) => {
                    // console.log(res);
                    return res;
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        return { showTranslation, showDetail, showedCard, passCard };
    },
};
</script>

<style lang="scss" scoped>
.container {
    // width: 100%;
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
        cursor: pointer;
        box-shadow: 0px 0px 21px 6px rgba(44, 51, 51, 0.25);
        position: relative;
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
            margin-top: 30px;
            color: transparent;
            text-shadow: 0 0 19px #e6e2c3;
            transition: 0.3s;
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
            top: 98.5%;
            transition: 0.5s;
            width: 95%;
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
            user-select: none;
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
                font-size: 0.9rem;
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
                &:last-of-type {
                    border: none;
                }
            }
        }
    }
}
</style>
