<template>
    <div class="account__container">
        <div class="account__container__back"></div>
        <div class="account__container__front">
            <div class="account__container__front__topline"></div>
            <router-view :loginData="loginData"></router-view>
            <div
                class="account__container__front__error"
                :class="{
                    'account__container__front__error--show': error.show,
                }"
            >
                {{ error.text }}
            </div>
            <div
                class="account__container__front__buttons"
                :class="{ register__buttons: status === 'signup' }"
            >
                <button
                    :class="{
                        account__container__front__buttons__first:
                            status === 'login',
                        account__container__front__buttons__second:
                            status === 'signup',
                    }"
                    @click="login"
                >
                    <SVGLoading
                        v-if="loginLoading"
                        class="account__container__front__buttons__loading"
                    />
                    <div v-else>Sign in</div>
                </button>
                <button
                    :class="{
                        account__container__front__buttons__first:
                            status === 'signup',
                        account__container__front__buttons__second:
                            status === 'login',
                    }"
                    @click="register"
                >
                    <SVGLoading
                        v-if="registerLoading"
                        class="account__container__front__buttons__loading"
                    />
                    <div>Register</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import SVGLoading from "@/components/SVG/buttonLoading.vue";
import axios from "axios";
export default {
    components: { SVGLoading },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const status = computed(() => route.name);
        const loginLoading = ref(false);
        const error = reactive({
            show: false,
            text: undefined,
        });
        const registerLoading = ref(false);
        const loginData = reactive({
            email: undefined,
            password: undefined,
        });
        const login = () => {
            if (status.value === "signup") {
                router.push("login");
            } else {
                loginLoading.value = true;
                console.log(loginData);
                axios
                    .post(`${store.state.BASE_URL}/user/login`, loginData)
                    .then((res) => {
                        error.show = false;
                        error.text = undefined;
                        console.log(res);
                        store.commit("UPDATE_ME", { toke: res.data.token });
                        loginLoading.value = false;
                        router.push("/")
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.data.message === "Auth failed") {
                            error.show = true;
                            error.text = "Email or Password is incorrect!";
                        }
                        loginLoading.value = false;
                    });
            }
        };
        const register = () => {
            if (status.value === "login") {
                router.push("signup");
            } else {
            }
        };
        return {
            status,
            login,
            register,
            loginData,
            registerLoading,
            loginLoading,
            error,
        };
    },
};
</script>

<style lang="scss" scoped>
.account__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    margin-top: 30px;

    &__back {
        position: absolute;
        left: 0;
        right: 0;
        top: 50px;
        margin: auto;
        // background-color: #bfd7b5;
        background: rgb(143, 162, 135);
        background: linear-gradient(
            0deg,
            rgba(46, 79, 79, 1) 5%,
            rgb(143, 162, 135) 100%
        );
        width: 95%;
        height: 70%;
        border-radius: 20px;
    }
    &__front {
        width: 75%;
        height: 80%;
        background: #bfd7b5;
        background: linear-gradient(0deg, #88a47c 5%, #bfd7b5 100%);
        z-index: 1;
        padding-top: 50px;
        border-radius: 25px;
        box-shadow: 0 0 50px #2e4f4f80;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__error {
            margin-bottom: 20px;
            color: rgb(209, 24, 24);
            opacity: 0;
            visibility: hidden;
            transition: 0.3s;
            &--show {
                opacity: 1;
                visibility: visible;
            }
        }
        &__topline {
            position: absolute;
            width: 90px;
            height: 15px;
            left: 0;
            right: 0;
            margin: auto;
            top: 15px;
            border-radius: 50px;
            background-color: #2e4f4f;
        }
        &__buttons {
            display: flex;
            flex-direction: column;
            width: 75%;
            align-items: center;
            justify-content: center;
            &__loading {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
            &__first {
                min-height: 62px;
                position: relative;
                width: 100%;
                border-radius: 50px;
                background-color: #2e4f4f;
                color: white;
                padding: 15px 0;
                font-size: 1.7rem;
                box-shadow: 0 5px 7px 2px rgba(46, 79, 79, 0.3);
                margin-bottom: 50px;
                cursor: pointer;
                transition: 0.3s;
                &:hover {
                    font-size: 1.76rem;
                    box-shadow: none;
                }
            }
            &__second {
                position: relative;
                width: 85%;
                background-color: rgba(255, 255, 255, 0.2);
                border: 1px solid white;
                border-radius: 50px;
                padding: 7px 0;
                cursor: pointer;
                font-size: 1.3rem;
                color: white;
                transition: 0.3s;
                &:hover {
                    width: 90%;
                }
            }
        }
        .register__buttons {
            flex-direction: column-reverse;
        }
    }
}
</style>
