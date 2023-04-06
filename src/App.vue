<template>
    <SVGLogo class="logo" />
    <router-view />
</template>

<script>
import SVGLogo from "@/components/SVG/logo.vue";
export default {
    components: {
        SVGLogo,
    },
};
</script>
<style lang="scss">
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #2e4f4f;
}
body {
    display: flex;
    justify-content: center;
}
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: none;
    border: none;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    max-width: 700px;
    height: 100%;
    background-color: #2e4f4f;
    color: #2c3e50;
    padding-top: 20px;
    @media (max-width: 700px) {
        padding-top: 60px;
        width: 100%;
        max-width: 100%;
    }
    .logo {
        width: 40%;
    }
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
