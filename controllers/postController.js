const Post = require ("../models/postModels");

exports.getAllPosts = async (req, res, next) => {

    try {
        const posts = await Post.find();

        res.status(200).json({
            status: 'success',
            results: post.length,
            data: {
                posts,
            },
        });

    } catch (e) {
        return res.send(400).json({   
            status: "fail",
        });
    }

};

//localhost:3000/posts/:id
//for retriveing a single post
exports.getOnePost = async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            results: post.length,
            data: {
                posts,
            },
        });

    } catch (e) {
        res.send(400).json({
            status: "fail",
        });
    }

};

//for creating a post
exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);

        res.status(200).json({
            status: 'success',
            results: post.length,
            data: {
                posts,
            },
        });

    } catch (e) {
        res.send(400).json({
            status: "fail",
        });
    }

};

//for updating
exports.updatePost = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, 
        });

        res.status(200).json({
            status: 'success',
            results: post.length,
            data: {
                posts,
            },
        });

    } catch (e) {
        res.send(400).json({
            status: "fail",
        });
    }

};

//for deleting

exports.deletePost = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
        });

    } catch (e) {
        res.send(400).json({
            status: "fail",
        });
    }

};