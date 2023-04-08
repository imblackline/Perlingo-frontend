<template>
    <div class="cardlist">
        <div class="cardlist__sortTabs">
            <div
                class="cardlist__sortTabs__tab"
                :class="{
                    'cardlist__sortTabs__tab--active': sortType === 'date',
                    'cardlist__sortTabs__tab--ractive': sortType === 'rdate',
                }"
                @click="sortByDate"
            >
                Date
            </div>
            <div
                class="cardlist__sortTabs__tab"
                :class="{
                    'cardlist__sortTabs__tab--active':
                        sortType === 'difficulty',
                    'cardlist__sortTabs__tab--ractive':
                        sortType === 'rdifficulty',
                }"
                @click="sortByDifficulty"
            >
                Difficulty
            </div>
            <div
                class="cardlist__sortTabs__tab"
                :class="{
                    'cardlist__sortTabs__tab--active': sortType === 'alphabet',
                    'cardlist__sortTabs__tab--ractive':
                        sortType === 'ralphabet',
                }"
                @click="sortByAlphabet"
            >
                Alphabet
            </div>
        </div>
        <div class="cardlist__list">
            <div
                class="cardlist__list__card"
                v-for="card in $store.state.Allcards"
                :key="card._id"
                @click="showCard(card._id)"
            >
                <div class="cardlist__list__card__text">
                    {{ card.text.charAt(0).toUpperCase() + card.text.slice(1) }}
                </div>
                <div
                    class="cardlist__list__card__difficulty"
                    :style="{
                        'background-color': difficultyColor(card.difficulty),
                    }"
                >
                    {{ card.difficulty }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const sortType = ref("date");
        const sortByDate = () => {
            if (sortType.value === "date") {
                sortType.value = "rdate";
            } else {
                sortType.value = "date";
            }
            store.commit("SORT_CARDS", sortType.value);
        };
        const sortByAlphabet = () => {
            if (sortType.value === "alphabet") {
                sortType.value = "ralphabet";
            } else {
                sortType.value = "alphabet";
            }
            store.commit("SORT_CARDS", sortType.value);
        };
        const sortByDifficulty = () => {
            if (sortType.value === "difficulty") {
                sortType.value = "rdifficulty";
            } else {
                sortType.value = "difficulty";
            }
            store.commit("SORT_CARDS", sortType.value);
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
        const showCard = (cardId) => {
            router.push(`/${cardId}`);
        };
        return {
            sortType,
            sortByDate,
            sortByAlphabet,
            sortByDifficulty,
            difficultyColor,
            showCard,
        };
    },
};
</script>

<style lang="scss" scoped>
.cardlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    &__sortTabs {
        display: flex;
        width: 100%;
        justify-content: space-between;
        &__tab {
            padding: 2px 25px;
            min-width: 120px;
            user-select: none;
            cursor: pointer;
            font-size: 0.9rem;
            color: #88a47c;
            border: 2px solid #227c70;
            border-radius: 50px;
            transition: 0.3s;
            &--active {
                background-color: #227c70;
                color: #e6e2c3;
                font-weight: bold;
            }
            &--ractive {
                background-color: #88a47c;
                border: 2px solid #88a47c;
                color: #2e4f4f;
                font-weight: bold;
            }
        }
    }
    &__list {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        &__card {
            background-color: #227c70;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.2rem;
            padding: 20px;
            cursor: pointer;
            margin-bottom: 10px;
            border-radius: 7px;
            transition: 0.3s;
            &:hover {
                background-color: #1f7267;
            }
            &:hover & {
                &__difficulty {
                    opacity: 1;
                }
            }
            &__difficulty {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9rem;
                color: black;
                transition: 0.3s;
                font-weight: bold;
                padding: 0;
                width: 60px;
                opacity: 0.7;
                border-radius: 50px;
            }
        }
    }
}
</style>
