import { createStore } from "vuex";

export default createStore({
    state: {
        BASE_URL: "http://localhost:3000",
        Allcards: [],
    },
    mutations: {
        SAVE_ALLCARDS(state, cards) {
            localStorage.setItem("cards", JSON.stringify(cards));
            state.Allcards = cards;
        },
        UPDATE_ALLCARDS(state) {
            state.Allcards.forEach((card) => (card.status = "need Practice"));
            localStorage.setItem("cards", JSON.stringify(state.Allcards));
        },
        DELETE_CARD(state, cardId) {
            state.Allcards = state.Allcards.filter((card) => card._id !== cardId);
        },
        SORT_CARDS(state, type) {
            if (type === "alphabet") {
                state.Allcards.sort((a, b) => a.text.localeCompare(b.text));
            } else if (
                type === "ralphabet" ||
                type === "rdate" ||
                type === "rdifficulty"
            ) {
                state.Allcards.reverse();
            } else if (type === "date") {
                state.Allcards.sort((a, b) =>
                    a.created_at.localeCompare(b.created_at),
                );
            } else if (type === "difficulty") {
                const priority = {
                    easy: 1,
                    tricky: 2,
                    hard: 3,
                    super: 4,
                };
                state.Allcards.sort(
                    (a, b) => priority[b.difficulty] - priority[a.difficulty],
                );
            }
        },
    },
    actions: {},
    modules: {},
});
