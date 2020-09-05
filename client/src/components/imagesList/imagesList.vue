<template src='./imagesList.html'></template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Axios from "axios";

@Component
export default class ImagesList extends Vue {
  public BASE_API_URL = "http://localhost:4000/";
  public imageArr: any = [];
  public async uploadDoc(event: any) {
    try {
      var files = event.target.files;

      // if (files.length < 4) {
      //   return;
      // }
     
      let formData = new FormData();
      event.target.files.forEach((element: any) => {
        formData.append("file", element);
      });

      let res = await Axios.post(
        this.BASE_API_URL + "upload/uploadImages",
        formData
      );

      if (res.data.code == 500) {
        alert("Please Upload mininum 4 files")
      }else if(res.data.code == 200){
        this.fetchImageList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async fetchImageList() {
    try {
      let res = await Axios.post(
        this.BASE_API_URL + "upload/fetchImageList",
        {}
      );
      console.log(res);
      this.imageArr = res.data.images;
    } catch (error) {
      console.log(error);
    }
  }

  public async loadImage(path: any, i: any) {
    try {
      let response = await Axios.post(this.BASE_API_URL + "upload/showImages", {
        path: "https://kishandevelop.s3-us-west-2.amazonaws.com/" + path
      });
      let dom: any = document.getElementById("imageEl" + i);
      let img = document.createElement("img");
      img.src =
        "data:image/" + path.split(".").pop() + ";base64," + response.data;
      img.id = "img-id" + i;
      img.width = 150;
      img.height = 150;
      dom.innerHTML = "";
      dom.appendChild(img);
    } catch (error) {
      console.log(error);
    }
  }

  public mounted() {
    this.fetchImageList();
  }
}
</script>
<style scoped>
div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
}
</style>