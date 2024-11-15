class NewsViewer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.loadArticles();
    }

    categoria(){
      const pagina = window.location.pathname.split('/').pop();
      switch (pagina) {
        case 'index.html':
          return 'https://news-foniuhqsba-uc.a.run.app';
        case 'worldNews.html':  
          return 'https://news-foniuhqsba-uc.a.run.app/WorldNews';    //Este link por alguna razon esta vacio y no se ve nada  
        case 'sport.html':  
          return 'https://news-foniuhqsba-uc.a.run.app/Sport';
        case 'Finance.html':  
          return 'https://news-foniuhqsba-uc.a.run.app/Finance';
        case 'Tecnology.html':  
          return 'https://news-foniuhqsba-uc.a.run.app/Technology';
        case 'Entertainment.html':  
          return 'https://news-foniuhqsba-uc.a.run.app/Entertainment';
        default:
          return 'Desconocido';
      }
    }
       
    async loadArticles() {
      try {
        const url = this.categoria();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener los artículos');
        }
        const articles = await response.json();
        this.renderArticles(articles);
      } catch (error) {
        console.error('Error:', error);
        this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
      }
    }
  
    renderArticles(articles) {
      const template = document.getElementById('article-template');
      
      // Limpiar contenido existente
      this.innerHTML = '';
  
  
      articles.forEach(article => {
        // Clonar el contenido de la plantilla
        const articleContent = document.importNode(template.content, true);
        
        // Rellenar la plantilla con los datos del artículo
        articleContent.querySelector(
          ".link"
        ).href = `./article.html?id=${article.id}`;
        articleContent.querySelector('.title').textContent = article.headline;
        articleContent.querySelector('.author').textContent = article.author;
        articleContent.querySelector('.description').innerHTML = article.body;
        
        // Añadir el artículo al componente
        this.appendChild(articleContent);
      });
    }
  }
  
  // Definir el elemento personalizado
  customElements.define('news-viewer', NewsViewer);


  const getId = () => {
    const searchParams = new URLSearchParams(location.search.slice(1));
    return Number(searchParams.get('id'));
  }
  class CustomArticle extends HTMLElement {
    constructor() {
      super()
      this.id = getId()
      console.log({ id: this.id })
    }

    connectedCallback() {
      this.render()
    }

    async loadArticles() {
      return fetch('https://news-foniuhqsba-uc.a.run.app').then(res => res.json())
    }

    async render() {
      // 1. API get All Articles
      const articles = await this.loadArticles()
      console.log({ articles })
      // 2. filter the 'article' by the id `this.id`
      const article = articles.find(article => article.id == this.id)
      console.log({ article })
      // 3. remplace the html with the article data
      // Rellenar la plantilla con los datos del artículo
      this.querySelector('.title').textContent = article.headline;
      this.querySelector('.author').textContent = article.author;
      this.querySelector('.description').innerHTML = article.body;
      console.log('OK')
    }
  }

  customElements.define('custom-article', CustomArticle);