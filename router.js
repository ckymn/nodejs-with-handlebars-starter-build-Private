const express = require("express");
const router = express.Router();

const user = require("./modules/user/routes");
const get = require("./modules/get/route");
const post = require("./modules/post/routes");
const admin = require("./modules/admin/route");
const user_middleware = require("./middleware");

// get 
router.get(`/`, get.home);
router.get(`/admin`, get.admin);
router.get(`/blog`,get.blog);
router.get(`/contact`,get.contact);
router.get(`/about`, get.about)

// admin
router.get(`/admin/categories`, admin.get_categories);
router.post(`/admin/categories`, admin.add_categories);
router.delete(`/admin/categories/:id`, admin.delete_categories);
router.get(`/admin/posts`, admin.admin_posts);

// post
router.post(`/post/add`, post.add_post);
router.get(`/post/add`, user_middleware.auth,post.get_add_post)
router.get(`/post/:id`, post.get_post);

// user
router.get(`/auth/login`,user.login_get);
router.post(`/auth/login`,user.login.route);
router.get(`/auth/register`,user.register_get);
router.post(`/auth/register`,user.register);
router.get(`/auth/logout`,user.logout);

module.exports = router;
