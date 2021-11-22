import { HttpNodeService } from "../../service/HttpService";

export default async function getChatData() {
  try {
    const endpoint = 'codebuds-fk/chat/chats';
    return await HttpNodeService.get(endpoint).then(function (res) {
      return res.data;
    });
  } catch (error) {
    return {};
  }
}
