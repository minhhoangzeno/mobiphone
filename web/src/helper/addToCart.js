import axios from "axios";
import { apiUrl } from "../enviroment";

const access_token = localStorage.getItem("token");
export const addToCart = async (props) => {
  const { productId, price, userId } = props;

  if (userId) {
    return axios({
      method: "POST",
      url: `${apiUrl}/Payments/add-to-cart`,
      params: {
        access_token,
        product: {
          productId: productId,
          price: price,
          userId,
        },
      },
    })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        return "Bạn cần đăng nhập!";
      });
  } else {
    return "Bạn cần đăng nhập!";
  }
};
