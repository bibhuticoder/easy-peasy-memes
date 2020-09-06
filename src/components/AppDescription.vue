<template>
  <div class="home">
    <div class="appDetails">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#90CAF9"
          fill-opacity="1"
          d="M0,192L24,181.3C48,171,96,149,144,122.7C192,96,240,64,288,48C336,32,384,32,432,69.3C480,107,528,181,576,181.3C624,181,672,107,720,106.7C768,107,816,181,864,192C912,203,960,149,1008,112C1056,75,1104,53,1152,53.3C1200,53,1248,75,1296,101.3C1344,128,1392,160,1416,176L1440,192L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
        />
      </svg>

      <img src="assets/images/icon_64.png" class="appIcon" />
      <h1 class="title">
        EasyPeasyMemes
        <span class="version">1.0.0</span>
      </h1>

      <p class="subtitle">Generate memes the easy way</p>

      <div class="details">
        <div class="video">
          <iframe
            width="500"
            height="350"
            src="https://www.youtube.com/embed/XD--hoByjEo"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="text">
          Browser extension and a web app to help you generate Memes easier and faster
          <br />
          <br />🌍 Generate memes from any image on the internet
          <br />✂️ Capture screenshot &amp; convert it to memes
          <br />🧰 Both chrome extension &amp; the web app
          <br />🛠 Highly customizable configurations
          <br />☁️ One Click Upload & Share to social media
          <br />🗜️ Automatic image compression
          <br />👋 Free &amp; open source(Very soon !!)
          <br />

          <div class="btnDownloadExtensionWrapper">
            <a
              href="https://chrome.google.com/webstore/detail/easypeasymemes/fdohoeeblalffcllcggonkejgfapichh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button class="btn btnDownloadExtension">
                <i class="fa fa-cloud-download"></i>
                Download Extension
              </button>
            </a>
          </div>
        </div>
      </div>

      <div class="album">
        <h2>😎 Memes from the EasyPeasyMemes</h2>

        <div class="imagesList">
          <div class="imageListItem">
            <img src="assets/images/1.jpg" />
          </div>
          <div class="imageListItem">
            <img src="assets/images/2.jpg" />
          </div>
          <div class="imageListItem">
            <img src="assets/images/3.jpg" />
          </div>
          <div class="imageListItem">
            <img src="assets/images/6.jpg" />
          </div>
          <div class="imageListItem">
            <img src="assets/images/4.jpg" />
          </div>
          <div class="imageListItem">
            <img src="assets/images/7.jpg" />
          </div>
          <div class="imageListItem">
            <img src="assets/images/5.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppDescription",
};
</script>

<style lang="scss">
.appDetails {
  font-family: "Comic Neue";
  color: #373737;

  .appIcon {
    display: block;
    margin: 0 auto;
    margin-top: -5rem;
  }

  .title {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 3rem;
    text-align: center;

    .version {
      font-size: 0.7rem;
    }
  }

  .subtitle {
    margin-top: 0;
    text-align: center;
    font-size: 1.5rem;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5rem;
    margin-bottom: 5rem;
    padding: 0 4rem;

    .text {
      padding-left: 4rem;
      font-size: 1.1rem;
      line-height: 1.8rem;
    }

    .btnDownloadExtensionWrapper {
      margin-top: 2rem;
      text-align: left;

      a {
        .btnDownloadExtension {
          outline: none;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          background-color: #90caf9;
          font-size: 1.3rem;
          padding: 1rem 2rem;
          color: black;
          text-decoration: none;
        }

        &:hover {
          background-color: darken($color: #90caf9, $amount: 5);
        }
      }
    }
  }

  .album {
    margin-top: 8em;
    text-align: center;

    .imagesList {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .imageListItem {
        margin: 1rem;
      }
    }

    .buyCoffee {
      display: block;
      margin-top: 2rem;
    }
  }
}
</style>
