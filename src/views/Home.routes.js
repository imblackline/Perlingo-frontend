import SmartCardsList from "@/components/SmartCardsList.vue";
import SmartCard from "@/components/SmartCard.vue";

const routes = [
    {
        path: ":cardId",
        name: "practiceCard",
        component: SmartCard,
    },
    {
        path: "nocard",
        name: "noCard",
        component: SmartCard,
    },
    {
        path: "cardlist",
        name: "cardlist",
        component: SmartCardsList,
    },
];

export default routes;
