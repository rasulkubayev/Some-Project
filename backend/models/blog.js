const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;



const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        required: true
      
    },
    slug: {
        type: {},
        unique: true,
        index: true
    },
    body: {
        type: String,
        required: true,
        min: 200,
        max: 2000000,
        
    },
    excerpt: {
        type: String,
        max: 1000
    },
    mtitle: {
        type: String
    },
    
    mdesc: {
        type: String
    },


    photo: {
        data: Buffer,
        contentType: String
    },
    
    categories: [{type: ObjectId, ref: 'Category', required: true}],
    tags: [{type: ObjectId, ref: 'Tag', required: true}],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }

},
 {timestamp: true}
 );

 

module.exports = mongoose.model('Blog', blogSchema);