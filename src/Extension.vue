<template>
  <div class="appContainer" ref="appContainer">
    <div class="toolbar">
      <button
        @click="save()"
        class="toolbarBtn btnSave"
        v-if="type === 'SCREENSHOT'"
        title="Convert to Meme"
      >
        <i class="fa fa-magic"></i>
      </button>
      <button @click="close()" class="toolbarBtn btnClose" title="Close">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <MemeGenerator :imagePath="image" v-if="type === 'IMAGE'" />
    <Screenshot
      ref="screenshotApp"
      :image="image"
      @screenshot="handleScreenshot"
      v-if="type === 'SCREENSHOT'"
    />
  </div>
</template>

<script>
import MemeGenerator from "./components/MemeGenerator.vue";
import Screenshot from "./components/Screenshot.vue";

export default {
  components: { MemeGenerator, Screenshot },
  data() {
    return {
      type: null, //IMAGE, SCREENSHOT
      image: null,
    };
  },

  mounted() {
    // disable develper tools
    this.$refs.appContainer.addEventListener("contextmenu", (e) =>
      e.preventDefault()
    );

    // init app only after fonts are loaded(FabricJS Issue)
    let parent = document.getElementById("_easy_peasy_memes");
    this.image = parent.getAttribute("data-image");
    this.type = parent.getAttribute("data-app-type");
    parent.remove();
  },

  methods: {
    close() {
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id, function () {});
      });
    },
    save() {
      this.$refs.screenshotApp.save();
    },
    handleScreenshot(imageData) {
      this.type = "IMAGE";
      this.image = imageData;
    },
  },
};
</script>
<style lang="scss" scoped>
.appContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 2147483645;
}

.toolbar {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2147483647;

  .toolbarBtn {
    $size: 40px;
    height: $size;
    width: $size;
    border-radius: 50%;
    border: none;
    text-align: center;
    line-height: $size;
    cursor: pointer;
    color: #ffebee;
    outline: none;
    font-size: 1rem;
  }

  .btnClose {
    background-color: #ef5350;
    box-shadow: 1px 1px 2px #f44336;
  }

  .btnSave {
    margin-right: 5px;
    background-color: #4caf50;
    box-shadow: 1px 1px 2px #2e7d32;
    animation: btn-pulse-animation 1.5s infinite;
  }
}

@keyframes btn-pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 1);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0.7);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 1);
  }
}
</style>