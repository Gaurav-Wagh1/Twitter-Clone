const { TweetRepository, HashtagRepository } = require('../repositories/index');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async createTweet(data) {
        try {
            const content = data.content;
            let tags = content.match(/#[A-Za-z0-9\-\.\_]+(?:|$)/g);        // to match the hashtag;
            tags = tags.map((element) => element.substring(1));
            const tweet = await this.tweetRepository.create(data);
            const presentTags = await this.hashtagRepository.findByName(tags);
            const presentTagsTitle = presentTags.map(tag => tag.title);
            let newTags = tags.filter(tag => !presentTagsTitle.includes(tag));
            newTags = newTags.map(tag => {
                return { title: tag, tweets: [tweet.id] }
            });
            const response = await this.hashtagRepository.bulkCreate(newTags);
            presentTags.forEach((tag) => {
                tag.tweets.push(tweet._id);
                tweet.hashtags.push(tag._id);
                tag.save();
            });
            response.forEach((tag)=>{
                tweet.hashtags.push(tag._id);
            })
            tweet.save()
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TweetService;