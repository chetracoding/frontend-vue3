<template>
  <div ref="notif" class="alert">
    <v-slide-x-reverse-transition group>
      <v-alert
        v-for="{ id, msg, opts } of notifications"
        :key="id"
        v-bind="opts"
        :text="msg"
        dense
        closable
        class="mb-2"
        @click:close="close(id)"
      />
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const notifications = ref([]);

    function push({ msg, options }) {
      const id = new Date().valueOf() + Math.random();
      const opts = {
        timeout: 4000,
        ...options,
      };

      notifications.value.push({
        id,
        msg,
        opts,
      });

      if (opts.timeout) {
        setTimeout(() => {
          close(id);
        }, opts.timeout);
      }
    }
    function close(id) {
      notifications.value = notifications.value.filter(
        (item) => item.id !== id
      );
    }

    return {
      // data
      notifications,

      // methods
      push,
      close,
    };
  },
};
</script>

<style scoped>
.alert {
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
}
</style>
