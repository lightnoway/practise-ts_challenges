import axios, { type AxiosInstance } from "axios";
import {
  ApiConfigType,
  CreateApiClient,
  Method,
  RequestConfig,
  RequestConfigOption,
  RequestConfigOptionObj,
  RequestMethod,
} from "./types";
import { createApiByConfig } from ".";

interface AConfig extends ApiConfigType {
  // getUser: {
  //   req: { id: number };
  //   res: { id: number; content: string }[];
  // };
  // removeArticle: {
  //   req: {};
  //   res: void;
  // };
  editArticle: {
    req: { id: number };
    res: void;
  };
}

type _editArticle = AConfig["editArticle"];
const editArticle =
  // (instance: AxiosInstance) => (option: _editArticle["req"]) => {
  (instance: AxiosInstance) => (option: _editArticle["req"]) => {
    const ret: Promise<_editArticle["res"]> = null;
    return ret;
  };

const axioInstance = axios.create({ baseURL: "baidu.com" });
const api = createApiByConfig<AConfig>(axioInstance, {
  // getUser: "Get ssdf",
  // getUser: "GET ssdf",
  // removeArticle: {
  //   method: "DELETE",
  //   path: "aritcle",
  // },
  editArticle,
});
// removeArticle: {
//   method: "DELETE",
//   path: "article",`
// },
// editArticle: (instance) => {
//   return (option) => instance.put("path", option) as Promise<void>;
// },
// });
//能够自动提示
api
  .getUser({ id: 3 })
  .then((items) => console.log("first content", items[0].content));
