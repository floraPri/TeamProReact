import { getAuthToken } from "@/component/user/axios_helper";
import axios from "axios";

const API_BASE_URL = "http://localhost:8081";
const API_MYPAGE_BASE_URL = "http://localhost:8081/myPage/myp";
const API_FEED_DETAIL_BASE_URL = "http://localhost:8081/myPage/feedDetail";

const ApiService = {

    //피드삭제
    deleteFeed : (feedCode) => {
        console.log("deleteFeed 호출!!", feedCode);
        return axios.delete(`${API_MYPAGE_BASE_URL}/${feedCode}`,{
            headers: {
              Authorization: `Bearer ${(getAuthToken())}`
           },
          });
    },

    //1건 select
    fetchFeedById : (feedCode) => {
        console.log("피드 상세수정페이지 호출!!!",feedCode);
        return axios.get(`${API_FEED_DETAIL_BASE_URL}/${feedCode}`,{
            headers: {
              Authorization: `Bearer ${(getAuthToken())}`
           },
          });
    },

    //피드 수정


};

export default ApiService;