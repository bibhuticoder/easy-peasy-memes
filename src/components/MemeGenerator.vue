<template>
  <div class="memeGenerator">
    <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" />

    <div class="memeWrapper">
      <div class="toolbar">
        <button
          class="btn btn-secondary btn-sm mb-1"
          title="Background Image"
          @click="handleFileBtnClick('BACKGROUND')"
        >
          <i class="fa fa-file-image-o"></i>
        </button>

        <button
          class="btn btn-secondary btn-sm mb-1"
          @click="handleFileBtnClick('IMAGE')"
          title="Insert Image"
        >
          <i class="fa fa-camera-retro"></i>
        </button>

        <button
          class="btn btn-secondary btn-sm mb-1"
          @click="addText({top: 250})"
          title="Insert Text"
        >
          <i class="fa fa-text-width"></i>
        </button>

        <button class="btn btn-secondary btn-sm mb-1" @click="remove()" title="Delete">
          <i class="fa fa-trash"></i>
        </button>

        <button class="btn btn-secondary btn-sm mb-1" @click="sendBack()" title="Send Backwards">
          <i class="fa fa-minus-circle"></i>
        </button>

        <button class="btn btn-secondary btn-sm mb-1" @click="bringFront()" title="Bring Forward">
          <i class="fa fa-plus-circle"></i>
        </button>

        <button class="btn btn-secondary btn-sm mb-1" @click="clear()" title="Reset">
          <i class="fa fa-refresh"></i>
        </button>
        <div class="memeOptionsWrapper" ref="memeOptionsWrapper">
          <button
            class="btn btn-secondary btn-sm"
            :class="{'--active': showConfig}"
            @click="toggleConfig()"
            title="Settings"
          >
            <i class="fa fa-cog"></i>
          </button>

          <div class="memeOptions" ref="memeOptions" v-show="showConfig">
            <table>
              <tr>
                <td class="label">Background</td>
                <td class="input">
                  <input
                    type="color"
                    v-model="config.canvas.backgroundColor"
                    @input="handleCanvasChange"
                  />
                </td>
              </tr>

              <tr>
                <td class="label">Width</td>
                <td class="input">
                  <input type="number" v-model="config.canvas.width" @input="handleCanvasChange" />
                </td>
              </tr>
              <tr>
                <td class="label">Height</td>
                <td class="input">
                  <input type="number" v-model="config.canvas.height" @input="handleCanvasChange" />
                </td>
              </tr>

              <tr>
                <td class="label">Font Size</td>
                <td class="input">
                  <input
                    type="number"
                    v-model="config.text.fontSize"
                    @input="handleTextConfigChange"
                  />
                </td>
              </tr>
              <tr>
                <td class="label">Font Family</td>
                <td class="input">
                  <select v-model="config.text.fontFamily" @input="handleTextConfigChange">
                    <option v-for="font in fontsOptions" :key="font" :value="font">{{font}}</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td class="label">Text Stroke</td>
                <td class="input">
                  <input type="color" v-model="config.text.stroke" @input="handleTextConfigChange" />
                </td>
              </tr>

              <tr>
                <td class="label">Text Fill</td>
                <td class="input">
                  <input type="color" v-model="config.text.fill" @input="handleTextConfigChange" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="canvasWrapper">
        <canvas id="canvas" ref="canvas" height="500" width="500"></canvas>

        <div class="bottomNav">
          <button class="btn" @click="download()">
            <i class="fa fa-cloud-download"></i>
            Download
          </button>

          <div>
            <button
              class="btn"
              @click="uploadToImgur()"
              :disabled="shareLoading || !allowLinkGenerate"
            >
              <i class="fa fa-share-alt"></i>
              {{shareLoading ? 'Generating link..' : 'Get share link(public)'}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="credits">
      <a
        href="https://easy-peasy-memes.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >EasyPeasyMemes</a>
      |
      Made with
      <span style="color: #f44336">❤</span>&nbsp;by
      <a
        href="https://github.com/bibhuticoder"
        target="_blank"
        rel="noopener noreferrer"
      >bibhuti</a>
    </div>

    <Modal @closed="imgurLink = null" v-if="imgurLink" :imageLink="imgurLink" />
  </div>
</template>

<script>
import { fabric } from "fabric";
import { saveAs } from "file-saver";
import axios from "axios";
import Modal from "./Modal.vue";
import WebFont from "webfontloader";
import Compressor from "compressorjs";

export default {
  name: "MemeGenerator",
  props: {
    imagePath: { type: String, required: false },
  },
  components: { Modal },
  data() {
    return {
      canvas: null,
      showConfig: false,
      imgurLink: null,
      shareLoading: false,
      backgroundImage: null,
      allowLinkGenerate: false,
      config: {
        text: {
          fontSize: 50,
          fontFamily: "Impact",
          stroke: "#000000",
          strokeWidth: 2,
          fill: "#ffffff",
        },
        canvas: {
          backgroundColor: "#ffffff",
          backgroundImage: null,
          height: 500,
          width: 500,
        },
        controls: {
          cornerStyle: "circle",
          cornerStrokeColor: "black",
          borderColor: "black",
          cornerColor: "white",
        },
      },
      fontsOptions: ["Impact", "Anton", "Montserrat", "Comic Neue"],
    };
  },

  mounted() {
    WebFont.load({
      google: {
        families: ["Anton", "Montserrat", "Comic Neue"],
      },
      custom: {
        families: ["Impact"],
      },
      active: () => this.initFabric(),
    });

    // hide custom menus when clicked outside of it
    document.onclick = (e) => {
      if (!this.$refs.memeOptionsWrapper.contains(e.target))
        this.showConfig = false;
    };
  },

  methods: {
    async initFabric() {
      this.canvas = new fabric.Canvas("canvas");
      this.canvas.cornerStyle = "circle";
      this.canvas.preserveObjectStacking = true;
      this.handleCanvasChange();
      document.onkeydown = this.handleKeyDown; // stop the bringtofront on selected objects

      if (this.imagePath) {
        this.$refs.fileInput.setAttribute("data-mode", "BACKGROUND");

        // compress file and load it on canvas
        await fetch(this.imagePath)
          .then((r) => r.blob())
          .then((blobFile) => {
            let file = new File([blobFile], null, { type: "image/png" });
            this.compressImage(file, (result) => {
              var reader = new FileReader();
              reader.onload = (f) => {
                var data = f.target.result;
                this.loadImageOntocanvas(data);
              };
              reader.readAsDataURL(result);
            });
          });
      }

      this.addText();
      this.canvas.setActiveObject(this.canvas.item(0));
      this.canvas.item(0).enterEditing();
      this.canvas.item(0).selectAll();
    },

    handleCanvasChange() {
      this.canvas.setDimensions({
        width: this.config.canvas.width,
        height: this.config.canvas.height,
      });
      if (this.config.canvas.backgroundColor) {
        this.canvas.backgroundColor = this.config.canvas.backgroundColor;
        this.canvas.renderAll();
      }
      if (this.config.canvas.backgroundImage)
        this.loadImageOntocanvas(this.config.canvas.backgroundImage, false);
    },

    handleFileBtnClick(mode) {
      this.$refs.fileInput.setAttribute("data-mode", mode);
      this.$refs.fileInput.click();
      document.onkeydown = this.handleKeyDown;
    },

    handleFileChange(e) {
      var file = e.target.files[0];
      if (file)
        this.compressImage(file, (result) => {
          var reader = new FileReader();
          reader.onload = (f) => {
            var data = f.target.result;
            this.loadImageOntocanvas(data);
          };
          reader.readAsDataURL(result);
        });
    },

    compressImage(image, callback) {
      new Compressor(image, {
        quality: 0.9,
        maxWidth: 600,
        maxHeight: 600,
        convertSize: 1,
        success: (result) => callback(result),
      });
    },

    addImageElement(img) {
      img.set(this.config.controls);
      this.canvas.add(img);
      this.canvas.setActiveObject(img);
      this.canvas.centerObject(img);
    },

    addBackgroundImage(img, resizeCanvas = false) {
      if (img.width < 200 || img.height < 200) {
        alert("Invalid image size. Must be greater than 200 pixels");
        this.config.canvas.backgroundImage = null;
        return;
      }

      if (resizeCanvas) {
        this.config.canvas.width = img.width;
        this.config.canvas.height = img.height;
        this.canvas.setDimensions({
          width: img.width,
          height: img.height,
        });
      }

      this.canvas.setBackgroundImage(
        img,
        this.canvas.renderAll.bind(this.canvas),
        {
          scaleX: this.canvas.width / img.width,
          scaleY: this.canvas.height / img.height,
        }
      );
    },

    loadImageOntocanvas(data, resizeCanvas = true) {
      fabric.Image.fromURL(
        data,
        (img, error) => {
          if (error) {
            alert("Error loading file");
            this.config.canvas.backgroundImage = null;
            return;
          }
          let mode = this.$refs.fileInput.dataset.mode;
          if (mode === "BACKGROUND") {
            this.config.canvas.backgroundImage = data;
            this.addBackgroundImage(img, resizeCanvas);
          } else if (mode === "IMAGE") this.addImageElement(img);
          this.allowLinkGenerate = true;
        },
        { crossOrigin: "Anonymous" }
      );
    },

    addText() {
      var textbox = new fabric.Textbox("TEXT GOES HERE", {
        ...this.config.text,
        ...this.config.controls,
        width: 350,
        textAlign: "center",
        fontWeight: "bold",
      });
      this.canvas.add(textbox);
      this.canvas.centerObject(textbox);
      this.allowLinkGenerate = true;
    },

    handleKeyDown(e) {
      if (e.key === "Delete") this.remove();
    },

    remove() {
      this.canvas.remove(this.canvas.getActiveObject());
    },

    download() {
      this.canvas.discardActiveObject().renderAll();
      this.$refs.canvas.toBlob((blob) => {
        new Compressor(blob, {
          quality: 0.4,
          success(result) {
            saveAs(result, "meme.png");
          },
          error(err) {
            console.log(err.message);
          },
        });
      });
    },

    clear() {
      this.canvas.clear();
      this.config.canvas.backgroundImage = null;
      this.allowLinkGenerate = false;
    },

    toggleConfig() {
      this.showConfig = !this.showConfig;
    },

    async uploadToImgur() {
      this.shareLoading = true;

      this.canvas.discardActiveObject().renderAll();
      this.$refs.canvas.toBlob((blob) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          var base64data = reader.result.replace("data:image/png;base64,", "");
          let body = {
            image: base64data,
            type: "base64",
          };
          let headers = {
            "Content-Type": "application/json",
            Authorization: "Client-ID 2eff09c0028f911",
            Accept: "application/json",
          };
          await axios
            .post("https://api.imgur.com/3/image", body, { headers })
            .then((response) => {
              this.imgurLink = response.data.data.link;
              this.shareLoading = false;
            })
            .catch(function (error) {
              console.log(error);
            });
        };
      });
    },

    handleTextConfigChange() {
      let text = this.canvas.getActiveObject();
      if (text) {
        text.set(this.config.text);
        this.canvas.renderAll();
      }
    },

    bringFront() {
      this.canvas.bringForward(this.canvas.getActiveObject());
    },

    sendBack() {
      this.canvas.sendBackwards(this.canvas.getActiveObject());
    },
  },
};
</script>

<style lang="scss" scoped>
.memeGenerator {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #90caf9;
  font-family: "Comic Neue";

  .btn {
    outline: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    background-color: whitesmoke;
    color: #373737;
    border-radius: 3px;
    transition: all 0.25s ease-in-out;

    &.--active {
      background-color: white;
    }

    &:hover {
      background-color: white;
    }
  }

  .hidden {
    display: none;
  }

  .credits {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #373737;
    a {
      color: #373737;
    }
  }

  .memeWrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    text-align: center;

    .toolbar {
      display: flex;
      flex-direction: column;
      margin-right: 5px;

      .btn {
        height: 32px;
        width: 32px;
        margin-bottom: 5px;
        border-radius: 50%;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        font-size: 1rem;
        text-align: center;
      }

      .memeOptionsWrapper {
        position: relative;

        .memeOptions {
          position: absolute;
          top: 0;
          left: calc(100% + 10px);
          background-color: white;
          width: 200px;
          padding: 0.5rem;
          border-radius: 5px;
          z-index: 100;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          &:after {
            content: "";
            position: absolute;
            left: 0;
            top: 0%;
            transform: translateY(100%);
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-right-color: white;
            border-left: 0;
            margin-top: -10px;
            margin-left: -10px;
          }

          input,
          select {
            width: 80px;
            border: 1px solid #373737;
            outline: none;
            padding: 0.25rem;
            border-radius: 3px;
            background-color: white;
          }
          select {
            width: 90px;
          }
          input[type="color"] {
            padding: 0.15rem 0.25rem;
          }

          table {
            width: 100%;
            td.label {
              font-size: 0.8rem;
              text-align: left;
            }
            td.input {
              padding-left: 1rem;
            }
          }
        }
      }
    }

    .canvasWrapper {
      #canvas {
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .bottomNav {
        display: flex;
        justify-content: center;
        .btn {
          display: flex;
          margin: 10px;
          i {
            margin-right: 5px;
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>