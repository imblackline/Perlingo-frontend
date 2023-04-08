export default {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
        el.escEvent = function(ev) {
            if (ev.key === 'Escape') {
                binding.value(ev, el);
            }
        };

        document.body.addEventListener('keyup', el.escEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
        document.body.removeEventListener('keyup', el.escEvent);
    }
};
