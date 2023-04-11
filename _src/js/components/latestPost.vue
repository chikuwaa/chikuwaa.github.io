
<!--
chatGPT生成tumblr取得コードをカスタム
-->
<template>
  <div>
    <h2>Latest Tumblr Posts Timeline</h2>
    <ul class="post_list">
        <li v-for="post in viewPosts" :key="post.id" :style="post.styleObject">
          <p class="post_tit" v-if="post.title">{{ post.title }}</p>
          <figure v-if="post.firstImage">
            <img :src="post.firstImage" alt="First Image">
          </figure>
          <template v-else>
            <div class="post_txt">{{ post.first50Chars }}</div>
          </template>
          <p class="post_date">{{ formatDate(post.date) }}</p>

          <a :href="post.srcUrl" target="_blank">More</a>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      blogData: [],
      tumblrApiKey: '5rfBtZZcFzOiUNx5hSGeYwP8vJ3QPCtUnBAaxKceak49IqSluT',
      tumblrBlogNames: ['isobeagedesu', 'chikuwaaaa'],
      sortedPosts: [],
      viewPosts:[]
    };
  },

  methods: {
    async getPosts(blogName) {
      const response = await fetch(`https://api.tumblr.com/v2/blog/${blogName}/posts?api_key=${this.tumblrApiKey}&limit=5`);
      const data = await response.json();
      // console.log(data);
      // console.log(data.response.blog);

      data.response.posts.map((post) => {
        this.setDoc(post.body);
        return this.getReturnContent(post.id, post.date,blogName,post.post_url,post.body);
      });
      this.blogData = data.response.blog.theme.background_color

      return ;

    },
    setDoc(htmlData) {
      this.doc = new DOMParser().parseFromString(htmlData, 'text/html');
    },
    searchTagContent(tag) {
      return Array.from(this.doc.getElementsByTagName(tag)).map((node) => node.innerHTML);
    },
    searchImg(){
      return Array.from(this.doc.getElementsByTagName('img')).map((node) => node.src);
    },
    getFirstContent(items){
      return items.length > 0 ? items[0] : '';
    },
    getReturnContent(i, date ,n ,u){
      const firstH1Content = this.getFirstContent(this.searchTagContent('h1'));
      const firstImage = this.getFirstContent(this.searchImg());
      const first50Chars = this.searchTagContent('p').join('').slice(0, 50);
      const returnItem = {
        id: i,
        title: firstH1Content ? firstH1Content : "",
        date: new Date(date),
        firstImage: firstImage || '',
        first50Chars: firstImage ? '' : first50Chars,
        srcBlogName: n,
        srcUrl: u,
        styleObject: {
          "border-color": 'red',
        }

      };
      return returnItem;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' });
    },
  },
  async created() {
    const allPosts = await Promise.all(this.tumblrBlogNames.map(this.getPosts));
    this.posts = allPosts.flat();
    this.sortedPosts = this.posts.sort((a, b) => b.date - a.date);
    this.viewPosts = this.sortedPosts.slice(0,8);

  },
};
</script>
