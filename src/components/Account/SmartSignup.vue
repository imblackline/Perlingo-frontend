<template>
    <div class="register">
        <h1 class="register__title">Register</h1>
        <p class="register__subtitle">Wellcome buddy, please register</p>
        <div class="register__field">
            <span class="material-icons-round register__field__icon">
                email
            </span>
            <input
            class="register__field__email"
            placeholder="Enter your email"
            type="email"
            name="newemail"
            id="newemail"
            />
        </div>
        <div class="register__field">
            <span class="material-icons-round register__field__icon">
                vpn_key
            </span>
            <input
                class="register__field__password"
                placeholder="Enter your password"
                type="password"
                name="newpassword"
                id="newpassword"
                autocomplete="new-password"
            />
        </div>
        <div class="register__field">
            <span class="material-icons-round register__field__icon">
                vpn_key
            </span>
            <input
                class="register__field__password"
                placeholder="Re-Enter your password"
                type="password"
                name="renewpassword"
                id="renewpassword"
            />
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.register {
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
        &:last-of-type {
            margin-bottom: 40px;
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
