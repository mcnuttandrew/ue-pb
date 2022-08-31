from flask import Flask, request, render_template
from config import config


import sqlite3

# Flask
app = Flask(__name__, static_folder="static")

# Database Connection


# Routes
@app.route('/')
def intro():
    return render_template('introduction.html')
    
@app.route('/utility-elicitation')
def utilityElicitation():
    return render_template('utilityElicitation.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')   





if __name__ == '__main__':
    app.run(host=config['host'], 
            port=config['port'], 
            debug=config['debug'])