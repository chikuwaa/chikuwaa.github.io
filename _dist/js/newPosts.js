"use strict";

// const userId = "isobeagedesu.tumblr.com";
var key = "eSlgizNBbTBYPNZhVIYBIBen3b1BNzA6cXAfIx5xtkntTZfZoj";

function fetchPosts(userId) {
  fetch("https://api.tumblr.com/v2/blog/".concat(userId, "/posts?api_key=").concat(key, "&limit=3")).then(function (response) {
    console.log(response.status); // => 200

    return response.json().then(function (jsondata) {
      // JSONパースされたオブジェクトが渡される
      if (!response.ok) {
        console.error("エラーレスポンス", response);
      } else {
        console.log(jsondata); // => {...}

        var view = "\n                            <h4>".concat(jsondata.response.blog.name, "</h4>\n                            <ul>\n                                <li>\n                                ").concat(jsondata.response.posts[0].body, "\n                                </li>\n                            </ul>\n                            ");
        var result = document.getElementById("result");
        result.innerHTML = view;
      }
    }).catch(function (error) {
      console.error(error); //ネットワークエラー
    });
  });
}