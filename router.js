const express = require("express");
const router = express.Router();

const user = require("./modules/user/routes");
const get = require("./modules/get/route");
const post = require("./modules/post/routes");
// const admin = require("./modules/admin/routes");
// const user_middleware = require("./modules/user/middleware");

// get 
router.get(`/`, get.home);
router.get(`/admin`, get.admin);
router.get(`/blog`,get.blog);
router.get(`/contact`,get.contact);

// router.get(`/`, user.home);
// router.get(`/admin`, user_middleware.requires_auth, user.admin_index);
// router.get(`/admin/add`,/*  user_middleware.requires_auth, */ user.admin_add_get);
// router.post(`/admin/add`, user_middleware.requires_auth, user.admin_add_post);
// router.delete(`/admin/delete/:id`, user_middleware.requires_auth, user.admin_delete);

// post
router.get(`/post/add`, post.add_post);
router.get(`/post/:id`, post.get_post);
router.get(`/post/test`, post.test);

// user
router.get(`/auth/login`,user.login_get);
router.post(`/auth/login`,user.login);
router.get(`/auth/register`,user.register_get);
router.post(`/auth/register`,user.register);
router.get(`/auth/logout`,user.logout);

module.exports = router;