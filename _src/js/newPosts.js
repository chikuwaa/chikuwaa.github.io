// const userId = "isobeagedesu.tumblr.com";
const key = "eSlgizNBbTBYPNZhVIYBIBen3b1BNzA6cXAfIx5xtkntTZfZoj";

function fetchPosts(userId) {
fetch(`https://api.tumblr.com/v2/blog/${userId}/posts?api_key=${key}&limit=3`)
    .then(response => {
        console.log(response.status); // => 200
        return response.json().then(jsondata => {
            // JSONパースされたオブジェクトが渡される
            if (!response.ok) {
                console.error("エラーレスポンス", response);
            }else{
                console.log(jsondata); // => {...}
                const view = `
                            <h4>${jsondata.response.blog.name}</h4>
                            <ul>
                                <li>
                                ${jsondata.response.posts[0].body}
                                </li>
                            </ul>
                            `;
                const result = document.getElementById("result");
                result.innerHTML = view;
            }

        }).catch(error => {
            console.error(error); //ネットワークエラー
        });
    });
}