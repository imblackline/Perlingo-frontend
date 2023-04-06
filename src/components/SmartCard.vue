<template>
    <div class="card" @click="showTranslation = !showTranslation">
        <div class="card__text">Continue</div>
        <div class="card__pronunciation">kənˈtinyo͞o</div>
        <div
            class="card__translation"
            :class="{ 'card__translation--show': showTranslation }"
        >
            ادامه دادن
        </div>
        <div class="card__buttons">
            <div class="card__buttons__button" @click.stop>
                Again
                <span class="material-icons-round card__buttons__button__icon">
                    refresh
                </span>
            </div>
            <div class="card__buttons__button" @click.stop>
                Pass
                <span class="material-icons-round card__buttons__button__icon">
                    done_all
                </span>
            </div>
        </div>
        <SVGDrop class="card__drop" @click.stop />
        <span class="material-icons-round card__dropicon" @click.stop>
            keyboard_arrow_down
        </span>
    </div>
</template>

<script>
import SVGDrop from "@/components/SVG/drop.vue";
import { ref } from "@vue/reactivity";
export default {
    components: { SVGDrop },
    setup() {
        const showTranslation = ref(false);
        return { showTranslation };
    },
};
</script>

<style lang="scss" scoped>
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
        text-shadow: 0 0 15px #e6e2c3;
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
        bottom: -68px;
        width: 95%;
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
    }
}
</style>
