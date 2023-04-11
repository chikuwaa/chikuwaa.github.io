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
      const backgroundColor = data.response.blog.theme.background_color;

      return data.response.posts.map((post) => {
        this.setDoc(post.body);
        return this.getReturnContent(post.id, post.date,blogName,post.post_url, backgroundColor);
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
    getReturnContent(i, date ,n ,u ,bcolor){
      const firstH1Content = this.getFirstContent(this.searchTagContent('h1'));
      const firstImage = this.getFirstContent(this.searchImg());
      let allChars = this.searchTagContent('p').join('');
      // console.log(allChars.length);
      let viewChars;
      if(allChars.length > 101){
        viewChars = this.searchTagContent('p').join('').slice(0, 100);
      }else{
        viewChars = allChars;

      }
      const returnItem = {
        id: i,
        title: firstH1Content ? firstH1Content : "",
        date: new Date(date),
        firstImage: firstImage || '',
        first100Chars: firstImage ? '' : viewChars,
        srcBlogName: n,
        srcUrl: u,
        styleObject: {
          "border-color": bcolor,
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
}).mount('#app');
