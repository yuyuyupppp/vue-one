import axios from "axios";

/**
 * 上传图片接口
 * @param {*} file
 */
async function uploadImage(file) {
  const from = new FormData();

  from.append("image", file);
  from.append("token", 'token');

  const res = await axios.request({
    url: 'uploadImageUrl',
    method: "POST",
    data: from,
  });

  //   console.log(res);
  const imgUrl = res.data;
  return imgUrl;
}

export default uploadImage;

