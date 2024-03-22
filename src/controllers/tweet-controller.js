import { TweetService } from "../services/index.js";

const tweetService = new TweetService();

const createTweet = async (req, res) => {
    try {
        const tweet = await tweetService.createTweet(req.body);
        res.status(201).json({
            data: tweet,
            success: true,
            error: {},
            message: "Successfully created tweet"
        })
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            error: error,
            message: error.messag
        })
    }
}

export { createTweet };