import Liked_Item from '../../models/Liked-Item';

class LikedItemService {
  async addLikedItem(itemData: any, userId: string | undefined) {
    const likedItem = new Liked_Item({ ...itemData, userId, amount: 1 });
    return await likedItem.save();
  };

  async fetchLikedItems(userId: string | undefined) {
    const likedItems = await Liked_Item.find({ userId });
    return likedItems;
  }

  async fetchLikedStatus(instrumentId: string, userId: string | undefined) {
    const likedItem = await Liked_Item.findOne({ userId, instrumentId });
    return likedItem !== null;
  };

  async removeLikedItem(instrumentId: string, userId: string | undefined) {
    await Liked_Item.deleteOne({ userId, instrumentId });
  }
}

export default new LikedItemService();
