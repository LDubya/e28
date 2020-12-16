<template>
  <div>
      <hr/>
    <h2>
      Citations
    </h2>
    <div>
      <p>
        (if not logged in):
      </p>
      <h3>
        Please log in to track citations
      </h3>
      <p>
        [ log in button ]
      </p>
    </div>

    <div>
      <p>
        (if logged in):
      </p>
      <h3>
        Citations
      </h3>
      <p>
        {{ citations }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "citations",
  data: function() {
    return {};
  },
  computed: {
    citations() {
      return this.$store.state.citations;
    },
  },
};
</script>
