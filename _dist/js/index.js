const { createApp } = Vue;
createApp({
   data() {
    return {
      posts: [],
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
      console.log(data);

      return data.response.posts.map((post) => {
        this.setDoc(post.body);
        return this.getReturnContent(post.id, post.date,blogName,post.post_url);
      });
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
}).mount('#app');
