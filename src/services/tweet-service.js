import { TweetRepository, HashtagRepository } from "../repositories/index.js";

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async createTweet(data) {
        try {
            const content = data.content;
            let tags = content.match(/#[A-Za-z0-9\-\.\_]+(?:|$)/g);        // to match the hashtag;
            tags = tags.map((element) => element.substring(1).toLowerCase());
            const tweet = await this.tweetRepository.create(data);
            const presentTags = await this.hashtagRepository.findByName(tags);
            const presentTagsTitle = presentTags.map(tag => tag.title);
            let newTags = tags.filter(tag => !presentTagsTitle.includes(tag));
            newTags = newTags.map(tag => {
                return { title: tag, tweets: [tweet.id] }
            });
            await this.hashtagRepository.bulkCreate(newTags);
            presentTags.forEach((tag) => {
                tag.tweets.push(tweet._id);
                tag.save();
            });
            tweet.save()
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetService;