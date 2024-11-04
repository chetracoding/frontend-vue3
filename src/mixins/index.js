export default {
  data() {
    return {
      rulesField: {
        required: (v) => !!v || "Value required",
        email: (v) => !v || /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || "Please enter a valid email",
      },
    };
  },
};
