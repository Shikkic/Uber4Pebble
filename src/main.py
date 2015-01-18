from flask import Flask, request

app = Flask(__name__)

@app.route('/api/test',methods=['GET','POST'])
def dealwithit():
    # Handle first post request
    if request.method == 'POST':
        print request.data
        pass
        # Send sequential POST requests

    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True)
