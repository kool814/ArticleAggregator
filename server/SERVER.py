from flask import Flask
from flask import request
from newspaper import Article
app = Flask(__name__)
#@app.route('/', methods=['POST'])

@app.route('/json-example', methods=['POST']) #GET requests will be blocked
def json_example():
    req_data = request.get_json()

    url1 = req_data['url'] 
    
    print(url1)
    #Import from newspaper import Article

    url = url1
    article = Article(url)
    article.download()
    article.parse()
    print(article.authors)
    print(article.title)

    return '''
           The url is: {}
           '''.format(url)

if __name__ == '__main__':
    app.run(debug=True, port = 8000)
