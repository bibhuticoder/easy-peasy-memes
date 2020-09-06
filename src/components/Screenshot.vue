<template>
  <div class="screenshot">
    <canvas id="secondaryCanvas" ref="secondaryCanvas"></canvas>
    <div class="primaryCanvasWrapper">
      <canvas id="primaryCanvas" ref="primaryCanvas"></canvas>
    </div>
    <canvas id="cropCanvas" ref="cropCanvas" class="hidden"></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";
import { saveAs } from "file-saver";

export default {
  name: "Screenshot",
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      imageObj: null,
      canvas: null,
      cropRect: null,
    };
  },
  created() {},

  mounted() {
    this.initSecondaryCanvas();
    this.initPrimaryCanvas();
  },

  methods: {
    initSecondaryCanvas() {
      var img = new Image();
      img.onload = () => {
        this.$refs.secondaryCanvas.width = img.width;
        this.$refs.secondaryCanvas.height = img.height;

        let ctx = this.$refs.secondaryCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, img.width, img.height);
      };
      img.src = this.image;
    },

    initPrimaryCanvas() {
      var img = new Image();
      img.onload = () => {
        this.imageObj = img;
        this.canvas = new fabric.Canvas("primaryCanvas");
        this.canvas.setWidth(img.width);
        this.canvas.setHeight(img.height);

        this.cropRect = new fabric.Image(img);
        this.cropRect.set({
          width: 200,
          height: 200,
          hasBorder: true,
          borderColor: "white",
          borderDashArray: [5],
          hoverCursor: "cursor",
          cornerStyle: "circle",
          cornerStrokeColor: "black",
          borderColor: "black",
          cornerColor: "white",
          minimumScaleTrigger: 0,
          lockScalingFlip: true,
          selectable: false,
        });
        this.canvas.centerObject(this.cropRect);

        this.cropRect.on("modified", () => this.crop(this.cropRect));
        this.cropRect.on("scaling", () => this.crop(this.cropRect));
        this.cropRect.on("moving", () => this.crop(this.cropRect));

        this.cropRect.on("deselected", () => {
          this.canvas.setActiveObject(this.canvas.item(0));
        });

        this.cropRect.setControlsVisibility({ mtr: false });
        this.canvas.add(this.cropRect);
        this.canvas.centerObject(this.cropRect);
        this.crop(this.cropRect);
        this.canvas.setActiveObject(this.canvas.item(0));
      };
      img.src = this.image;
    },

    crop(image) {
      if (image.left < 0) image.set({ left: 0 });
      if (image.top < 0) image.set({ top: 0 });
      if (image.left + image.width > this.canvas.width)
        image.set({ left: this.canvas.width - image.width });
      if (image.top + image.height > this.canvas.height)
        image.set({ top: this.canvas.height - image.height });

      image.set({
        width: image.width * image.scaleX,
        scaleX: 1,
        height: image.height * image.scaleY,
        scaleY: 1,
        cropX: image.left,
        cropY: image.top,
      });

      // max and min size
      if (image.width > (3 * this.canvas.width) / 4)
        image.set({ width: (3 * this.canvas.width) / 4 });
      if (image.height > (3 * this.canvas.height) / 4)
        image.set({ height: (3 * this.canvas.height) / 4 });
      if (image.width < 200) image.set({ width: 200 });
      if (image.height < 200) image.set({ height: 200 });
    },

    save() {
      this.$refs.cropCanvas.width = this.cropRect.width;
      this.$refs.cropCanvas.height = this.cropRect.height;
      let ctx = this.$refs.cropCanvas.getContext("2d");
      ctx.drawImage(
        this.imageObj,
        this.cropRect.left,
        this.cropRect.top,
        this.cropRect.width,
        this.cropRect.height,
        0,
        0,
        this.cropRect.width,
        this.cropRect.height
      );
      this.$emit("screenshot", this.$refs.cropCanvas.toDataURL());
    },
  },
};
</script>

<style lang="scss" scoped>
.screenshot {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #90caf9;

  #secondaryCanvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.25rem;
    cursor: crosshair;
  }
  .primaryCanvasWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: crosshair;
  }
}
</style>
