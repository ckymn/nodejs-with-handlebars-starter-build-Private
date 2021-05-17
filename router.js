const express = require("express");
const router = express.Router();
// const user = require("./modules/user/routes");
// const blog = require("./modules/blogs/routes");
// const user_middleware = require("./modules/user/middleware");

// // user
// router.get(`/`, user.home);
// router.get(`/admin`, user_middleware.requires_auth, user.admin_index);
// router.get(`/admin/add`,/*  user_middleware.requires_auth, */ user.admin_add_get);
// router.post(`/admin/add`, user_middleware.requires_auth, user.admin_add_post);
// router.delete(`/admin/delete/:id`, user_middleware.requires_auth, user.admin_delete);

// // blogs
// router.get(`/blog/:id`, user_middleware.requires_auth, blog.blog_single);
// router.get(`/about`, user_middleware.requires_auth, blog.blog_about);

// // auth
// router.post(`/login`,user.login);
// router.post(`/signup`,user.signup);
// router.post(`/logout`,user.logout);

module.exports = router;