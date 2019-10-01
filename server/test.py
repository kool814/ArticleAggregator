from newspaper import Article

url = 'https://www.shatnerchatner.com/p/i-am-the-horrible-goose-that-lives'
article = Article(url)
article.download()
article.parse()
print(article.authors)
print(article.publish_date)
