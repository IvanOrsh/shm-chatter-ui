import { useParams } from "react-router-dom";

import { useGetChat } from "@features/get-chat/model/hooks/useGetChat";

export default function Chat() {
  const params = useParams();
  const { data } = useGetChat({ _id: params._id! });

  return <h1>{data?.chat.name}</h1>;
}
