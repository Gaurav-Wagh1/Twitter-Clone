import { LikeRepository, TweetRepository } from "../repositories/index.js";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        // likeable means a tweet or comment on which like will be added
        // or from which like will be removed;
        let likeable;

        if (modelType == "Tweet") {
            likeable = await this.tweetRepository.getWithLikes(modelId);
        }
        else if (modelType == "Comment") {
            // later;
        }
        else {
            throw new Error("Unknown model type!");
        }

        // checking weather comment / tweet has like or not
        const exists = await this.likeRepository.findLike({
            onModel: modelType,
            likeable: modelId,
            user: userId
        });
        // if like is there no tweet / comment, remove that like;
        // if not, create that like;
        if (exists) {
            likeable.likes.pull(exists._id);
            await likeable.save();
            await exists.deleteOne();
        }
        else {
            const like = await this.likeRepository.create({
                onModel: modelType,
                likeable: modelId,
                user: userId
            });
            likeable.likes.push(like);
            await likeable.save();
        }
        return true;
    }
}

export default LikeService;