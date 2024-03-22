import Tweet from '../models/tweet.js';
import CrudRepository from './crud-repository.js';

class TweetRepository extends CrudRepository {

    constructor() {
        super(Tweet);
    }

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
            const response = await Tweet.findById(id).populate({ path: 'comments' }).lean();
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

export default TweetRepository;