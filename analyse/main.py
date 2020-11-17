from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return  'Hello world from ANALYSIS part !'

@app.route('/analyse/')
def analyse():
    return  'It works well with routing !'

if __name__ == "__main__":
    app.run(debug=True)