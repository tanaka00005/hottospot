import { useState } from "react";
import addFriendUserTable from "../updateTable/addFriendUserTable";

//フレンドの追加をする(snsで送られてきたuidを打つ)
const AddFriend = () => {
  const [friendUid, setFriendUid] = useState("");
  const [message, setMessage] = useState("");

  const handleAddFriend = async () => {
    if (!friendUid) {
      setMessage("UID を入力してください");
      return;
    }
    try {
      //友達の追加
      await addFriendUserTable(friendUid);
      setMessage(`友達登録完了`);
      setFriendUid(""); // 入力欄をクリア
    } catch (error) {
      setMessage("エラーが発生しました: " + error.message);
    }
  };

  return (
    <div>
      <div>
        <p>フレンド登録</p>
      </div>
      <input
        type="text"
        value={friendUid}
        onChange={(e) => setFriendUid(e.target.value)}
        placeholder="友達の UID を入力"
      />
      <button onClick={() => handleAddFriend()}>フレンド追加</button>
      <p>{message}</p>
    </div>
  );
};

export default AddFriend;
