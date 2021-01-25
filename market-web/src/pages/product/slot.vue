<template>
    <ul>
        <li>
            <slot :data="initValue"></slot>
        </li>
    </ul>
</template>

<script>
    let c = 0
    export default {
        data() {
            return {
                initValue: {a: 20, b: 30, c}
            }
        }
    }
</script>