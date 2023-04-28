<template>
    <div class="login">
        <h1 class="login__title">Login</h1>
        <p class="login__subtitle">Wellcome back, please login</p>
        <div class="login__field">
            <span class="material-icons-round login__field__icon"> email </span>
            <input
                class="login__field__email"
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email"
                v-model="loginData.email"
                />
            </div>
            <div class="login__field">
                <span class="material-icons-round login__field__icon">
                    vpn_key
                </span>
                <input
                class="login__field__password"
                placeholder="Enter your password"
                type="password"
                name="password"
                id="password"
                v-model="loginData.password"
            />
        </div>
    </div>
</template>

<script>
export default {
    props:['loginData'],
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__title {
        font-size: 3rem;
    }
    &__subtitle {
        margin-top: 10px;
        margin-bottom: 50px;
    }
    &__field {
        width: 75%;
        height: fit-content;
        position: relative;
        margin-bottom: 20px;
        &:last-of-type{
            margin-bottom: 20px;
        }
        &__icon {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 12px;
            margin: auto;
            height: fit-content;
            color: rgba(46, 79, 79, 0.8);
        }
        input {
            width: 100%;
            padding: 15px;
            padding-left: 50px;
            border-radius: 50px;
            font-size: 1.2rem;
            box-shadow: 0 5px 5px rgba(46, 79, 79, 0.3);
        }
    }
}
</style>
