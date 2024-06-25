export const getUserInfo = async (callback) => {
  const userInfo = await miro.board.getUserInfo();
  callback(userInfo.name);
};
