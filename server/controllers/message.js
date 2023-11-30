import User from "../models/User.js";

/* UPDATE */
export const addMessages = async (req, res) => {
  console.log(req.body);
  try {
    const { to, from, date, time, message } = req.body;
    const user = await User.findOne({firstName:from});
    const friend = await User.findOne({firstName:to});
    const values = {
      from: from,
      to: to,
      message: message,
      date: date,
      time: time
    }
    
    user.messages.push(values);
    friend.messages.push(values);

    await user.save();
    await friend.save();

    res.status(200).json(req.body);
  } catch (err) {
    res.status(409).json({ message: err.message});
  }
};

/* GET */

export const getMessages = async(req,res) => {
  try {
    const { username, friendname} = req.body;
    const user = await User.findOne({firstName:username});
    res.status(200).json(user.messages);
  } catch (err) {
    res.status(409).json({ message: err.message + " oommbuuu   " });
  }
}