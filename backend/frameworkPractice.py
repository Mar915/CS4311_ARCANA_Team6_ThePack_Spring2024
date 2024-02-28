from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/test")
def testing():
    return "<p>Ello there</p>"



#Can I just make a bunch of functions and have @app.route() above them?
#How do I run it as a server waiting for requests from the front end?
#What can I used to host?


# http://127.0.0.1:5000 is the port that backend will run on

# flask --app frameworkPractice run