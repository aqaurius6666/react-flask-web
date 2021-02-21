from backend.app import app, config_app
if __name__ == "__main__":
    config_app(deploy=False)
    app.run(debug=True)