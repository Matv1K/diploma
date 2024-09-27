import Comment from '../../models/Comment';
import User from '../../models/User';

class CommentService {
  // Add a new comment
  async addComment(userId: string, instrumentId: string, description: string, rating: number) {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('NO USER');
    }

    const newComment = new Comment({
      instrumentId,
      description,
      rating,
      userName: user.name,
    });

    await newComment.save();

    return newComment;
  }

  // Get all comments for a specific instrument
  async getComments(instrumentId: string) {
    const comments = await Comment.aggregate([
      { $match: { instrumentId } },
      { $sort: { createdAt: -1 } },
    ]);

    return comments;
  }
}

export default new CommentService();