import axios from 'axios';

const instance = axios.create({
  baseURL: APIHOST, // process.env is DEFINED in webpack.config
});



export async function getSuccess() {
  await instance.get('/')
    .then(res => {
      console.log(res.data);
    });
};