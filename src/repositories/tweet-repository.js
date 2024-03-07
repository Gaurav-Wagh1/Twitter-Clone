const Tweet = require('../models/tweet');

class TweetRepository {

    async create(data) {
        try {
            const response = await Tweet.create(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id) {
        try {
            const response = await Tweet.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            const response = await Tweet.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(offset, limit) {
        try {
            const response = await Tweet.find().skip(offset).limit(limit);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = TweetRepository;