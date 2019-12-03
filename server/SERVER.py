from flask import Flask
from flask import request
from newspaper import Article
import psycopg2
import random
app = Flask(__name__)

def insert_to_likes(query, person_id, article_id_param):
    sql = query
    conn = None
    try:
        # read database configuration
        # connect to the PostgreSQL database
        conn = psycopg2.connect(dbname = "articles" , user="kevinpresing", password = "123")
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (person_id, article_id_param) )
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def insert_to_database(query):
    sql = query
    conn = None
    article_id = None
    try:
        # read database configuration
        # connect to the PostgreSQL database
        conn = psycopg2.connect(dbname = "articles" , user="kevinpresing", password = "123")
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql)
        # get the generated id back
        article_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return article_id

def check_article_exists(url):
    conn = None
    url_set = set()
    try:
        conn = psycopg2.connect(dbname = "articles" , user="kevinpresing", password = "123")
        cur = conn.cursor()
        cur.execute("SELECT DISTINCT url FROM article")
        row = cur.fetchone()
 
        while row is not None:
            url_set.add(row)
            row = cur.fetchone()

        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return url in url_set

@app.route('/json-example', methods=['POST']) # GET requests will be blocked
def json_example():
    emails = ['tallperson@gmail.com', ]
    req_data = request.get_json()

    url1 = req_data['url'] 
    
    print("recieved url", url1)
    # Import from newspaper import Article

    url = url1
    article = Article(url)
    article.download()
    article.parse()
    print("Found the author as => ", article.authors[0])
    print("Found the title as => ", article.title)

    # Send all the packages
    # does article exist in database:
    if not check_article_exists(url):
        # insert article
        insert_query = "INSERT INTO article VALUES (DEFAULT, '" + article.authors[0] +"', '" + url + "', '" + article.title + "') RETURNING article_id"
        new_article_id = insert_to_database(insert_query)
        print("Inserted into article (DEFAULT, '" + article.authors[0] +"', '" + url + "', '" + article.title + "') RETURNING article_id") 

        # Randomize the id of an email ( 1 - 5 )
        person_id = random.randint(1,5)

        # insert into the likes table where the person id is the same
        # and for article id
        insert_query = "INSERT INTO likes (person_id, article_id) VALUES (%s, %s)"
        #$insert_query = "INSERT INTO likes VALUES (" + str(person_id )+ "," + str(new_article_id )+ ")"
        insert_to_likes(insert_query, person_id, new_article_id) 
        print("Inserted into Likes: (", str(person_id), ",", str(new_article_id), ")")


        # if DISLIKES: -- WE ARE NOT DOING DISLIKES FOR RIGHT NOW
            # insert into the likes table where the person id is the same
            # and for article id

        #print('response from server:',res.text)
        # Done seding all information

    return '''
           The url is: {}
           '''.format(url)

if __name__ == '__main__':
    app.run(debug=True, port = 8000)
