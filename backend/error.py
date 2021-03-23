from flask import jsonify


def BadInput():
    return jsonify({'message' : 'Bad input'}), 400

def NoPermission():
    return jsonify({'message' : 'You don\'t have permission to do this'}), 404