<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <h1>count:{{ count }}</h1>
    <h1>double:{{ double }}</h1>
    <ul>
      <li v-for="num in numbers" :key="num">{{ num }}</li>
    </ul>
    <div>name:{{ person.name }}, age: {{ person.age }}</div>
    <button class="btn" @click="increase">👍+1</button>

    <p>{{ greetings }}</p>
    <button class="btn" @click="updateGreetings">add hello</button>

    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  watch,
} from "vue";
import useMosePosition from "@/hooks/useMousePosition";

interface Data {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: {
    name?: string;
    age?: number;
  };
}

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    /*
    const count = ref(0)
    const double = computed(() => {
      return count.value * 2
    })

    function increase() {
      count.value++
    }

    return {
      count,
      double,
      increase
    }
    */

    onMounted(() => console.log("onMounted"));
    onUpdated(() => console.log("onUpdated"));

    const greetings = ref("");
    const updateGreetings = () => {
      greetings.value += " hello";
    };

    const data: Data = reactive({
      count: 0,
      increase: () => data.count++,
      double: computed(() => data.count * 2),
      numbers: [1, 2, 3, 4],
      person: { name: "1" },
    });
    data.person.age = 10;
    setTimeout(() => {
      data.numbers[3] = 9;
      data.person.age = 100;
    }, 2000);
    const refData = toRefs(data);

    watch([greetings, () => data.count], (newVal, oldVal) => {
      console.log(oldVal);
      console.log(newVal);
      document.title = `update ${greetings.value} ${data.count}`;
    });
    return {
      greetings,
      updateGreetings,
      ...refData,
      ...useMosePosition(),
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  padding: 5px 10px;
  border-radius: 3px;
  background-color: transparent;
  border: 1px solid #ededed;
  outline: none;
  cursor: pointer;
}
</style>
