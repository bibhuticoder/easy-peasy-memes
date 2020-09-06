<template>
  <div class="modalContainer">
    <div class="overlay"></div>

    <div class="modal">
      <div class="memeLink">
        <a :href="imageLink" target="_blank">{{imageLink}}</a>

        <div class="btnCancel" @click="close()">X</div>
      </div>

      <img :src="imageLink" class="memePreview" />

      <div class="bottomNav">
        <h2 class="title">Share it on social media</h2>
        <div class="socialLinkList">
          <div class="socialLinkListItem">
            <a :href="fbShareLink" target="_blank" rel="noopener noreferrer" class="--facebook">
              <img src="assets/images/facebook.svg" />
            </a>
          </div>
          <div class="socialLinkListItem">
            <a :href="twitterTweetLink" target="_blank" rel="noopener noreferrer" class="--twitter">
              <img src="assets/images/twitter.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    imageLink: {
      type: String,
      required: true
    }
  },

  methods: {
    close() {
      this.$emit("closed");
    }
  },

  computed: {
    fbShareLink() {
      return "https://www.facebook.com/sharer/sharer.php?u=" + this.imageLink;
    },

    twitterTweetLink() {
      return "https://twitter.com/intent/tweet?text=" + this.imageLink;
    }
  }
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 10;
}

.modal {
  max-width: 500px;
  min-height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  padding: 0.25rem;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 11;
  text-align: center;

  .memeLink {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    a {
      margin-left: 1.5rem;
      font-size: 1rem;
      color: #373737;
    }

    .btnCancel {
      flex-shrink: 0;
      $size: 30px;
      width: $size;
      height: $size;
      transform: translate(60%, -75%);
      border-radius: 50%;
      text-align: center;
      line-height: $size;
      cursor: pointer;
      color: white;
      background-color: #ef5350;
      box-shadow: 1px 1px 2px #f44336;
    }
  }

  .memePreview {
    width: 400px;
    height: auto;
    border-radius: 5px;
    // border: 1px solid #373737;
  }

  .bottomNav {
    text-align: center;
    .title {
      margin-bottom: 0;
      margin-top: 0.5rem;
      color: #373737;
    }

    .socialLinkList {
      display: flex;
      justify-content: center;

      .socialLinkListItem {
        cursor: pointer;
        transition: all 0.25s ease-in-out;

        img {
          width: 32px;
          height: 32px;
          margin: 0.5rem;
        }
      }
    }
  }
}
</style>
